import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function AdCard({ ad, externalLink }) {
  const navigate = useNavigate();

  const { title, content, slug, userId, createdAt } = ad;
  const truncatedTitle = title.length > 50 ? `${title.slice(0, 50)}...` : title;
  const truncatedContent =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;
  const adCreatedAt = createdAt || new Date().toISOString();

  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  return (
    <div className=" rounded-lg border-2 border-cyan-500  h-fit">
      <Link to={`/ads/ad/${ad.slug}`}>
        <img
          src={ad.image}
          alt="ad cover"
          className="h-[240px] w-full object-cover "
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
          <span className="text-sm">{moment(adCreatedAt).fromNow()}</span>
        </div>
        <p className="text-lg font-semibold line-clamp-2">{ad.title}</p>
        <span className="italic text-sm">{ad.category}</span>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={externalLink}
            target="_blank"
            className="p-3 bg-slate-700 rounded-lg text-center text-cyan-500 hover:bg-slate-600"
          >
            Get Product
          </a>

          <Link
            to={`/ads/ad/${ad.slug}`}
            className="p-3 bg-slate-700 rounded-lg text-center text-cyan-500 hover:bg-slate-600 "
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
