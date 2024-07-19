import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function UpdateCard({ update }) {
  const navigate = useNavigate();

  const { title, content, slug, userId, createdAt } = update;
  const truncatedTitle = title.length > 50 ? `${title.slice(0, 50)}...` : title;
  const truncatedContent =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;
  const updateCreatedAt = createdAt || new Date().toISOString();

  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  return (
    <div className="group relative border-2 border-teal-500 h-[450px] overflow-hidden rounded-lg transition-all">
      <Link to={`/updates/update/${update.slug}`}>
        <img
          src={update.image}
          alt="update cover"
          className="h-[240px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center">
          <img
            src={authorProfilePicture}
            alt={authorUsername}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm">@{authorUsername}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{moment(updateCreatedAt).fromNow()}</span>
        </div>
        <p className="text-lg font-semibold line-clamp-2">{update.title}</p>
        <span className="italic text-sm">{update.category}</span>
        <Link
          to={`/updates/update/${update.slug}`}
          className="z-10 bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default UpdateCard;
