import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import UpdateCommentSection from "./UpdateCommentSection";

function UpdatePage() {
  const { updateSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(null);
  const navigate = useNavigate();

  const fetchUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/update/getUpdate?slug=${updateSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setUpdate(data.update);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdate();
  }, [updateSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading update</div>;
  }

  const handleCategoryClick = (category) => {
    navigate("/updates", { state: { category } });
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen overflow-hidden">
      <div
        onClick={() => handleCategoryClick(update.category)}
        className="self-center mt-5 underline cursor-pointer hover:dark:text-cyan-300"
      >
        Category: {update && update.category}
      </div>
      <img
        src={update && update.image}
        alt={update && update.title}
        className="mt-5 p-3 max-h-[600px] w-full object-cover"
      />
      <div>
        <h1 className="text-xl  p-3 text-center font-serif break-words  md:text-2xl  lg:text-3xl  bg-black text-cyan-500 rounded-lg">
          {update && update.title}
        </h1>
      </div>
      {update && update.externalLink && (
        <a
          href={update.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit self-center text-purple-950 font-bold p-2 rounded-md mt-3 bg-cyan-300 hover:bg-cyan-500 transition-all duration-300"
        >
          Visit the site &#8594;
        </a>
      )}
      <div className="flex justify-between p-3 border-b border-cyan-600 mx-auto w-full max-w-3xl text-sm">
        <span>{update && new Date(update.createdAt).toLocaleDateString()}</span>
        <span>
          {update && (update.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full rounded-lg post-content text-black"
        dangerouslySetInnerHTML={{ __html: update && update.content }}
      ></div>
      {update && <UpdateCommentSection updateId={update._id} />}{" "}
      {/* Add comment section */}
    </main>
  );
}

export default UpdatePage;
