import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ResearchCard from "./ResearchCard";
import ResearchSkeleton from "./ResearchSkeleton";

function AllResearch() {
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalResearches, setTotalResearches] = useState(0);
  const researchesPerPage = 9;
  const { searchTerm, category } = useOutletContext();

  const fetchResearches = async (page, searchTerm = "", category = "") => {
    try {
      const res = await fetch(
        `/api/research/getResearches?startIndex=${
          page * researchesPerPage
        }&limit=${researchesPerPage}&searchTerm=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      if (page === 0) {
        setResearches(data.researches);
      } else {
        setResearches((prevResearches) => [
          ...prevResearches,
          ...data.researches,
        ]);
      }
      setTotalResearches(data.totalResearch);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchResearches(0, searchTerm, category);
  }, [searchTerm, category]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchResearches(newPage, searchTerm, category);
  };

  return (
    <div className="all-researches gap-3 flex flex-col p-3 sm:grid">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <ResearchSkeleton key={index} />
        ))
      ) : researches.length > 0 ? (
        <>
          {researches.map((research) => (
            <ResearchCard key={research._id} research={research} />
          ))}
          {researches.length < totalResearches && (
            <button
              className="load-more-button bg-teal-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </>
      ) : (
        <div>No researches available.</div>
      )}
    </div>
  );
}

export default AllResearch;
