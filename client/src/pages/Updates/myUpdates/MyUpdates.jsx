import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyUpdatesCard from "./MyUpdatesCard";
import UpdateCardSkeleton from "../UpdateCardSkeleton";

function MyUpdates() {
  const { currentUser } = useSelector((state) => state.user);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserUpdates = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/update/getUpdates?userId=${currentUser._id}`
        );
        const data = await res.json();
        setUpdates(data.updates);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserUpdates();
    } else {
      setUpdates([]);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="my-updates gap-3 flex flex-col p-3 sm:grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <UpdateCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (updates.length === 0) {
    return <div>You have no updates yet.</div>;
  }

  return (
    <div className="my-updates gap-3 flex flex-col p-3 sm:grid">
      {updates.map((update) => (
        <MyUpdatesCard
          key={update._id}
          update={update}
          isMyUpdate={true}
          currentUser={currentUser}
          setUpdates={setUpdates}
        />
      ))}
    </div>
  );
}

export default MyUpdates;
