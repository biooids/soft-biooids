import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import HomeSidebar from "./HomeSidebar";

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
        console.log(data);
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
    <div className="flex">
      <nav className="w-0 md:w-[16%] md:p-3 ">
        <HomeSidebar />
      </nav>
      <section className="p-3 flex flex-col w-full md:w-[84%] mx-auto min-h-screen">
        <div className="w-[90%] mx-auto overflow-hidden">
          {post && post.mainPost ? (
            <div className="flex gap-3 flex-col">
              <p className="text-xl mt-10 p-3 text-center font-serif w-full mx-auto md:text-2xl lg:text-3xl break-words bg-black text-cyan-500 rounded-lg">
                This is a Proposal contact me if you want it
              </p>
              <Link
                to="/about"
                className="underline p-2 bg-slate-700 text-cyan-500 w-fit rounded-lg hover:bg-slate-600"
              >
                Contact me
              </Link>
            </div>
          ) : (
            ""
          )}

          <h3 className="text-xl mt-10 p-3 text-center font-serif w-full mx-auto md:text-2xl  lg:text-3xl break-words bg-black text-cyan-500 rounded-lg">
            Title: {post && post.title}
          </h3>
        </div>
        <Link
          to={`/search?category=${post.category}`}
          className="self-center mt-5 underline hover:dark:text-cyan-300"
        >
          <div>Category: {post && post.category} &#8594;</div>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-5 p-3 max-h-[600px] w-full object-cover rounded-lg"
        />
        {post && post.externalLink && (
          <a
            href={post.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit self-center text-purple-950 p-2 rounded-md mt-3 bg-cyan-500 hover:bg-cyan-300 transition-all duration-300"
          >
            visit the site &#8594;
          </a>
        )}
        <div className="flex justify-between p-3 border-b border-cyan-600 mx-auto  w-full max-w-3xl text-sm ">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>

        <div
          className="p-3 max-w-2xl mx-auto w-full rounded-lg post-content text-black"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        <CommentSection postId={post && post._id} />
        <div className="max-w-4xl mx-auto w-full">
          <CallToAction />
        </div>
        <div className="flex flex-col items-center bg-cyan-100 mt-10  p-3 w-full dark:bg-black">
          <h1 className="text-xl mt-5">Recent Articles</h1>
          <div className="flex flex-wrap justify-center items-center md:grid grid-cols-3 top-projects w-full gap-4 ">
            {recentPosts &&
              recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostPage;
