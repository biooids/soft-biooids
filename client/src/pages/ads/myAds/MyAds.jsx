import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyAdsCard from "./MyAdsCard";
import AdCardSkeleton from "../AdCardSkeleton";

function MyAds() {
  const { currentUser } = useSelector((state) => state.user);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/ad/getAds?userId=${currentUser._id}`);
        const data = await res.json();
        setAds(data.ads);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserAds();
    } else {
      setAds([]);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="all-ads gap-3 flex flex-col p-3 sm:grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <AdCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (ads.length === 0) {
    return <div>You have no ads yet.</div>;
  }

  return (
    <div className="all-ads gap-3 flex flex-col p-3 sm:grid">
      {ads.map((ad) => (
        <MyAdsCard
          key={ad._id}
          ad={ad}
          isMyAd={true}
          currentUser={currentUser}
          setAds={setAds}
        />
      ))}
    </div>
  );
}

export default MyAds;
