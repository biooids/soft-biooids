import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PostCardSkeleton from "./PostCardSkeleton";

export default function PostCard({ post }) {
  if (!post) {
    return <PostCardSkeleton />;
  }

  const { title, content, slug, userId, createdAt, type } = post; // Include type in destructuring
  const postCreatedAt = createdAt || new Date().toISOString();

  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  // Determine the correct path based on the post type
  let path = `/post/${slug}`;
  if (type === "article") {
    path = `/articles/article/${slug}`;
  } else if (type === "research") {
    path = `/researches/research/${slug}`;
  }

  return (
    <div className="group relative border-2 border-teal-500 h-[450px] overflow-hidden rounded-lg w-full transition-all">
      <Link to={path}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[240px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col">
        <div className="flex items-center">
          <img
            src={authorProfilePicture}
            alt={authorUsername}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm">@{authorUsername}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{moment(postCreatedAt).fromNow()}</span>
        </div>
        <p className="text-lg font-semibold line-clamp-2">{title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={path}
          className="z-10 bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
