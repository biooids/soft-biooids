import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import ResearchCommentSection from "./ResearchCommentSection";

function ResearchPage() {
  const { researchSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [research, setResearch] = useState(null);
  const navigate = useNavigate();

  const fetchResearch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/research/getResearch?slug=${researchSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setResearch(data.research);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, [researchSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading research</div>;
  }

  const handleCategoryClick = (category) => {
    navigate("/researches", { state: { category } });
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen overflow-hidden">
      <div
        onClick={() => handleCategoryClick(research.category)}
        className="self-center underline cursor-pointer hover:dark:text-cyan-300"
      >
        Category: {research && research.category}
      </div>
      <img
        src={research && research.image}
        alt={research && research.title}
        className="mt-5 p-3 max-h-[300px] w-full object-cover"
      />
      <div>
        <h1 className="text-xl  p-3 text-center font-serif break-words  md:text-2xl  lg:text-3xl  bg-black text-cyan-500 rounded-lg">
          {research && research.title}
        </h1>
      </div>
      {research && research.externalLink && (
        <a
          href={research.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit self-center text-purple-950 font-bold p-2 rounded-md mt-3 bg-cyan-300 hover:bg-cyan-500 transition-all duration-300"
        >
          Visit the site &#8594;
        </a>
      )}
      <div className="flex justify-between p-3 border-b border-cyan-600 mx-auto w-full max-w-3xl text-sm">
        <span>
          {research && new Date(research.createdAt).toLocaleDateString()}
        </span>
        <span>
          {research && (research.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full rounded-lg post-content text-black"
        dangerouslySetInnerHTML={{ __html: research && research.content }}
      ></div>
      {research && <ResearchCommentSection researchId={research._id} />}{" "}
    </main>
  );
}

export default ResearchPage;
