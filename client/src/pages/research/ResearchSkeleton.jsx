import React from "react";

function ResearchSkeleton() {
  return (
    <div className="animate-pulse border-2 border-teal-500 h-[400px] overflow-hidden rounded-lg w-[430px] sm:w-full">
      <div className="h-[240px] w-full bg-gray-300" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-6 bg-cyan-300 rounded w-3/4" />
        <div className="h-4 bg-cyan-500 rounded w-1/2" />
        <div className="h-10 bg-cyan-700 rounded mt-2" />
      </div>
    </div>
  );
}

export default ResearchSkeleton;
