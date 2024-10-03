import React from "react";

function AdCard() {
  return (
    <div className="ad-card p-4 m-4 bg-gray-800 text-white rounded-md shadow-lg  h-fit">
      {/* Ad Image */}
      <img
        src="https://via.placeholder.com/300x150"
        alt="Ad Banner"
        className="w-full h-32 object-cover rounded-md"
      />

      {/* Ad Title */}
      <h2 className="text-xl font-bold mt-4">Amazing Product Title</h2>

      {/* Ad Description */}
      <p className="text-sm mt-2 text-gray-300">
        This is a brief description of the product being advertised. It's
        designed to give users an idea of what the ad is about.
      </p>

      {/* CTA (Call to Action) */}
      <a
        href="#"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Learn More
      </a>
    </div>
  );
}

export default AdCard;
