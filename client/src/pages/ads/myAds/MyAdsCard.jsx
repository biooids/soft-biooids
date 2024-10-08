import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Modal } from "flowbite-react";
import { CgDanger } from "react-icons/cg";

function MyAdsCard({ ad, isMyAd, currentUser, setAds }) {
  const navigate = useNavigate();

  const { title, content, slug, userId, createdAt } = ad;
  const truncatedTitle = title.length > 50 ? `${title.slice(0, 50)}...` : title;
  const truncatedContent =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;
  const adCreatedAt = createdAt || new Date().toISOString();

  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  const [showModal, setShowModal] = useState(false);
  const [adIdToDelete, setAdIdToDelete] = useState("");

  const handleDeleteAd = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/ad/deleteAd/${adIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setAds((prev) => prev.filter((ad) => ad._id !== adIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/ads/update-ad/${ad._id}`);
  };

  return (
    <div className="rounded-lg border-2 border-cyan-500  h-fit">
      <div>
        <Link to={`/ads/ad/${ad.slug}`}>
          <img
            src={ad.image}
            alt="ad cover"
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
            <span className="text-sm">{moment(adCreatedAt).fromNow()}</span>
          </div>
          <p className="text-lg font-semibold line-clamp-2">{ad.title}</p>
          <span className="italic text-sm">{ad.category}</span>
          <Link
            to={`/ads/ad/${ad.slug}`}
            className="p-3 dark:bg-slate-700 rounded-lg text-center dark:hover:bg-slate-900 bg-slate-100 hover:bg-slate-300"
          >
            Read more
          </Link>
          {isMyAd && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Button outline className="w-full" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                outline
                className="w-full"
                onClick={() => {
                  setShowModal(true);
                  setAdIdToDelete(ad._id);
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
                      Are you sure you want to delete this ad?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" onClick={handleDeleteAd}>
                        Yes, delete it
                      </Button>
                      <Button
                        color="success"
                        onClick={() => setShowModal(false)}
                      >
                        No, keep it
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAdsCard;
