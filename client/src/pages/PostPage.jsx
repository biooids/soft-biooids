import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-with-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post.category}&searchTerm=`}
        className="self-center mt-5 underline hover:dark:text-cyan-300"
      >
        <div>Category: {post && post.category} &#8594;</div>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-5 p-3 max-h-[600px] w-full object-cover"
      />
      {post && post.externalLink && (
        <a
          href={post.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit self-center text-purple-950 font-bold p-2 rounded-md mt-3 bg-cyan-300 hover:bg-cyan-500 transition-all duration-300"
        >
          visit the site &#8594;
        </a>
      )}
      <div className="flex justify-between p-3 border-b border-cyan-600 mx-auto  w-full max-w-3xl text-sm ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content dark:text-cyan-300"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post && post._id} />
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <div className="flex flex-col items-center bg-cyan-100 mt-10  p-3 w-full dark:bg-black">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}

export default PostPage;
