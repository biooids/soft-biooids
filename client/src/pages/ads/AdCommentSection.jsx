import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdComment from "./AdComment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";

export default function AdCommentSection({ adId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0); // Add state for total comments
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId: adId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
        setTotalComments(totalComments + 1);
      }
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${adId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments); // Set total comments from response
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [adId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setTotalComments(totalComments - 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 ">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-300 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <Alert color="info" className="my-5">
          <HiOutlineExclamationCircle className="h-5 w-5" />
          <div>
            <span>
              You must{" "}
              <Link
                to="/sign-up"
                className="font-medium underline hover:no-underline"
              >
                login
              </Link>{" "}
              before you can comment
            </span>
          </div>
        </Alert>
      )}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Add a comment"
          value={comment}
          rows={4}
          maxLength={200}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">{200 - comment.length} characters remaining</p>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            disabled={isSubmitting || !comment}
          >
            {isSubmitting ? <Spinner size="sm" /> : "Comment"}
          </Button>
        </div>
        {commentError && <p className="text-xs text-red-500">{commentError}</p>}
      </form>
      <div className="mt-6">
        <p className="font-bold mb-4 text-gray-700 dark:text-gray-300">
          Comments: {totalComments}
        </p>
        {comments.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <AdComment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={() => {
                setCommentToDelete(comment._id);
                setShowModal(true);
              }}
            />
          ))
        )}
      </div>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
