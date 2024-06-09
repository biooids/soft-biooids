import React from "react";
import { Link } from "react-router-dom";
import PostCardSkeleton from "./PostCardSkeleton";

export default function PostCard({ post }) {
  if (!post) {
    return <PostCardSkeleton />;
  }

  return (
    <div className="group relative border-2 border-teal-500 h-[400px] overflow-hidden rounded-lg w-[430px] sm:w-full transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[240px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
