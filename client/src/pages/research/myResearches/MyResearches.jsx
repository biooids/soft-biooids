import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyResearchCard from "./MyResearchCard";
import ResearchSkeleton from "../ResearchSkeleton";

function MyResearches() {
  const { currentUser } = useSelector((state) => state.user);
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserResearches = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/research/getResearches?userId=${currentUser._id}`
        );
        const data = await res.json();
        setResearches(data.researches);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserResearches();
    } else {
      setResearches([]);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="my-researches gap-3 flex flex-col p-3 sm:grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <ResearchSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (researches.length === 0) {
    return <div>You have no researches yet.</div>;
  }

  return (
    <div className="my-researches gap-3 flex flex-col p-3 sm:grid">
      {researches.map((research) => (
        <MyResearchCard
          key={research._id}
          research={research}
          isMyResearch={true}
          currentUser={currentUser}
          setResearches={setResearches}
        />
      ))}
    </div>
  );
}

export default MyResearches;
