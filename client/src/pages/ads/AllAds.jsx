import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import AdCard from "./AdCard";
import AdCardSkeleton from "./AdCardSkeleton";

function AllAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalAds, setTotalAds] = useState(0);
  const adsPerPage = 9;
  const { searchTerm, category } = useOutletContext();

  const fetchAds = async (page, searchTerm = "", category = "") => {
    try {
      const res = await fetch(
        `/api/ad/getAds?startIndex=${
          page * adsPerPage
        }&limit=${adsPerPage}&searchTerm=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      if (page === 0) {
        setAds(data.ads);
      } else {
        setAds((prevAds) => [...prevAds, ...data.ads]);
      }
      setTotalAds(data.totalAds);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchAds(0, searchTerm, category);
  }, [searchTerm, category]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchAds(newPage, searchTerm, category);
  };

  return (
    <div className="all-ads gap-3 flex flex-col p-3 sm:grid">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <AdCardSkeleton key={index} />
        ))
      ) : ads.length > 0 ? (
        <>
          {ads.map((ad) => (
            <AdCard key={ad._id} ad={ad} externalLink={ad.externalLink} />
          ))}
          {ads.length < totalAds && (
            <button
              className="load-more-button bg-teal-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </>
      ) : (
        <div>No Ads available.</div>
      )}
    </div>
  );
}

export default AllAds;
