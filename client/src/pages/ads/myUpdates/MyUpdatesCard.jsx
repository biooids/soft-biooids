import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Modal } from "flowbite-react";
import { CgDanger } from "react-icons/cg";

function MyUpdatesCard({ update, isMyUpdate, currentUser, setUpdates }) {
  const navigate = useNavigate();

  const { title, content, slug, userId, createdAt } = update;
  const truncatedTitle = title.length > 50 ? `${title.slice(0, 50)}...` : title;
  const truncatedContent =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;
  const updateCreatedAt = createdAt || new Date().toISOString();

  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  const [showModal, setShowModal] = useState(false);
  const [updateIdToDelete, setUpdateIdToDelete] = useState("");

  const handleDeleteUpdate = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/update/deleteUpdate/${updateIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUpdates((prev) =>
          prev.filter((update) => update._id !== updateIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/updates/update-update/${update._id}`);
  };

  return (
    <div className="group border-2 border-teal-500 overflow-hidden rounded-lg transition-all">
      <div>
        <Link to={`/updates/update/${update.slug}`}>
          <img
            src={update.image}
            alt="update cover"
            className="h-[240px] w-full object-cover transition-all duration-300 z-20"
          />
        </Link>
        <div className="p-3 flex flex-col gap-1">
          <div className="flex items-center">
            <img
              src={authorProfilePicture}
              alt={authorUsername}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm">@{authorUsername}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">{moment(updateCreatedAt).fromNow()}</span>
          </div>
          <p className="text-lg font-semibold line-clamp-2">{update.title}</p>
          <span className="italic text-sm">{update.category}</span>
          <Link
            to={`/updates/update/${update.slug}`}
            className="z-10 bottom-0 border border-cyan-500 dark:text-white hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none"
          >
            Read more
          </Link>
        </div>
      </div>
      {isMyUpdate && (
        <div className="p-2 gap-2 justify-between flex">
          <Button outline className="w-full" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            outline
            className="w-full"
            onClick={() => {
              setShowModal(true);
              setUpdateIdToDelete(update._id);
            }}
          >
            Delete
          </Button>

          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <CgDanger className="h-14 w-14 text-gray-950 mb-4 mx-auto" />
                <h3 className="mb-5 text-xl font-bold">
                  Are you sure you want to delete this update?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUpdate}>
                    Yes, delete it
                  </Button>
                  <Button color="success" onClick={() => setShowModal(false)}>
                    No, keep it
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default MyUpdatesCard;
