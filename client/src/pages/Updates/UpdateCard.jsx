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
    <div className="flex flex-col sm:flex-row">
      <Link to={`/updates/update/${update.slug}`}>
        <img
          src={update.image}
          alt="update cover"
          className="h-[300px] sm:w-[300px] rounded-lg object-cover "
        />
      </Link>
      <div className="p-3 flex flex-col gap-1 bg-white bg-opacity-5 flex-grow">
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
          className="p-3 dark:bg-slate-700 rounded-lg text-center dark:hover:bg-slate-900 bg-slate-100 hover:bg-slate-300 mt-3"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default UpdateCard;
