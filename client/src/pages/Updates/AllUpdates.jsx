import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import UpdateCardSkeleton from "./UpdateCardSkeleton";

function AllUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalUpdates, setTotalUpdates] = useState(0);
  const updatesPerPage = 9;
  const { searchTerm, category } = useOutletContext();

  const fetchUpdates = async (page, searchTerm = "", category = "") => {
    try {
      const res = await fetch(
        `/api/update/getUpdates?startIndex=${
          page * updatesPerPage
        }&limit=${updatesPerPage}&searchTerm=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      if (page === 0) {
        setUpdates(data.updates);
      } else {
        setUpdates((prevUpdates) => [...prevUpdates, ...data.updates]);
      }
      setTotalUpdates(data.totalUpdate);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchUpdates(0, searchTerm, category);
  }, [searchTerm, category]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchUpdates(newPage, searchTerm, category);
  };

  return (
    <div className="all-updates gap-3 flex flex-col p-3 ">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <UpdateCardSkeleton key={index} />
        ))
      ) : updates.length > 0 ? (
        <>
          {updates.map((update) => (
            <UpdateCard key={update._id} update={update} />
          ))}
          {updates.length < totalUpdates && (
            <button
              className="load-more-button bg-teal-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </>
      ) : (
        <div>No updates available.</div>
      )}
    </div>
  );
}

export default AllUpdates;
