import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import myImage from "../assets/mee.gif";

import { AiFillInstagram } from "react-icons/ai";
import {
  IoLogoWhatsapp,
  IoLogoNodejs,
  IoLogoJavascript,
  IoLogoFirebase,
} from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiMongoose,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { TiCloudStorage } from "react-icons/ti";

import HomeSidebar from "./HomeSidebar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const mainPosts = posts.filter((post) => post.mainPost);

  return (
    <div>
      <div className="flex ">
        <nav className="w-0 md:w-[16%] md:p-3 ">
          <HomeSidebar />
        </nav>
        <div className="flex flex-col gap-6  px-3 w-full md:w-[84%] mx-auto mb-10">
          <div className="md:h-[70vh] md:grid md:grid-cols-2 flex flex-col ">
            <div className="flex flex-col justify-center gap-3 bg-slate-950 bg-opacity-20 p-5">
              <h1 className="font-bold sm:text-2xl lg:text-3xl">
                Welcome to soft-biooids
              </h1>
              <p className="dark:text-cyan-400 text-xs sm:text-sm">
                Here you'll find a variety of articles about my projects. I'm
                building some cool stuff along the way like full stack apps with
                MERN stack, HTML, CSS, JAVASCRIPT, even 3D websites using 3JS
                and more.
              </p>
              <p className="dark:text-purple-500 flex gap-3">
                I am a full stack developer:{" "}
                <a
                  href="https://github.com/biooids"
                  className="dark:text-cyan-100 font-bold text-2xl hover:dark:text-cyan-300"
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </p>
              <Link
                to="/search"
                className="text-sm sm:text-lg dark:text-cyan-100 font-bold  hover:dark:text-cyan-300 underline w-fit"
              >
                Click here to Explore &#8594;
              </Link>
              {/* <a
              href=""
              className="text-sm sm:text-lg flex justify-center items-center w-fit gap-1 dark:text-cyan-100 font-bold  hover:dark:text-cyan-300 underline"
            >
              <FaCirclePlay />
              How it works &#8594;
            </a> */}
            </div>
            <div className="top-0 h-full relative">
              <img
                src={myImage}
                alt="my image"
                className="h-[200px] w-full md:h-full md:absolute mx-auto rounded-md object-cover"
              />
            </div>
          </div>

          <div className="flex gap-5 relative flex-col sm:flex-row">
            <div className="w-full sm:w-[20%] sm:sticky h-fit top-0 flex flex-col p-3 sm:p-0">
              <p>Buy This Web App For:</p>
              <div className="flex gap-1 text-red-500">
                <span className="text-nowrap">1,150</span>
                <span className="text-nowrap line-through">2,050</span>
                USD
              </div>
              <p className="mt-2 mb-5">Contact me for deal:</p>
              <div className="text-2xl flex justify-between pb-5 border-b-2 border-b-cyan-500">
                <a
                  href="mailto:ehwapyongm@gmail.com"
                  className="dark:hover:text-cyan-100"
                  target="_blank"
                >
                  <MdEmail />
                </a>
                <a
                  href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
                  className="dark:hover:text-cyan-100"
                  target="_blank"
                >
                  <IoLogoWhatsapp />
                </a>
                <a
                  href="https://www.instagram.com/soft_biooids/"
                  className="dark:hover:text-cyan-100"
                  target="_blank"
                >
                  <AiFillInstagram />
                </a>
              </div>
            </div>
            <div className="dark:text-purple-700 text-xs sm:text-sm border-b-8 p-5 gap-5 flex flex-col border-t-8 border-cyan-400 rounded-xl sm:w-[60%]">
              <h3 className="font-semibold text-center">Tech Stack</h3>
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiMongodb className="text-green-500" />
                  <span className="text-green-500">MongoDB</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiExpress className="text-gray-500" />
                  <span className="text-gray-500">Express</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <FaReact className="text-blue-500" />
                  <span className="text-blue-500">React</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <IoLogoNodejs className="text-green-500" />
                  <span className="text-green-500">Node.js</span>
                </div>
              </div>
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <FaHtml5 className="text-orange-600" />
                  <span className="text-orange-600">HTML5</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <FaCss3Alt className="text-blue-600" />
                  <span className="text-blue-600">CSS3</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <IoLogoJavascript className="text-yellow-500" />
                  <span className="text-yellow-500">JavaScript</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiTailwindcss className="text-blue-400" />
                  <span className="text-blue-400">Tailwind CSS</span>
                </div>
              </div>
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <FaGitAlt className="text-orange-500" />
                  <span className="text-orange-500">Git</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <FaGithub className="text-black" />
                  <span className="text-black">GitHub</span>
                </div>
              </div>
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiRedux className="text-purple-600" />
                  <span className="text-purple-600">Redux</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <IoLogoFirebase className="text-yellow-400" />
                  <span className="text-yellow-400">Firebase</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiMongoose className="text-red-600" />
                  <span className="text-red-600">Mongoose</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg">Currently learning:</h4>
                <div className="flex justify-between flex-wrap gap-4">
                  <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                    <SiNextdotjs className="text-amber-500" />
                    <span className="text-amber-500">Next.js</span>
                  </div>
                  <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                    <SiTypescript className="text-blue-500" />
                    <span className="text-blue-500">TypeScript</span>
                  </div>
                  <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                    <TbBrandThreejs className="text-black" />
                    <span className="text-black">Three.js</span>
                  </div>
                  <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                    <TiCloudStorage className="text-blue-500" />
                    <span className="text-blue-500">Cloud Storage</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-[20%]">
              I am a freelancer. You can{" "}
              <span className="text-nowrap text-purple-500 underline">
                Hire me
              </span>
            </div>
          </div>
          <Link
            to="/search"
            className="text-sm sm:text-lg dark:text-cyan-100 font-bold m-auto hover:dark:text-cyan-300 underline w-fit"
          >
            Search projects &#8594;
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 border-t-2 border-cyan-500">
        <h2 className="text-2xl text-center sm:text-start font-semibold dark:text-cyan-500">
          My Top Projects
        </h2>
        <div className="flex flex-wrap justify-center items-center md:grid top-projects gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          ) : mainPosts.length > 0 ? (
            mainPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="text-center text-xl font-semibold text-red-600">
              No main posts available.
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {loading ? (
          <div className="flex flex-wrap justify-center items-center md:grid top-projects gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center sm:text-start dark:text-cyan-500">
              Recent Posts
            </h2>
            <div className="flex flex-wrap justify-center items-center md:grid top-projects gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-sm sm:text-lg dark:text-cyan-100 font-bold hover:dark:text-cyan-300 underline w-fit m-auto"
            >
              View all posts &#8594;
            </Link>
          </div>
        ) : (
          <div className="text-center text-xl font-semibold text-red-600">
            There is no post yet ...
          </div>
        )}
      </div>
      <div className="p-3 bg-cyan-100 dark:bg-cyan-950">
        <CallToAction />
      </div>

      {/* 
      import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PostCardSkeleton from "./PostCardSkeleton";

export default function PostCard({ post }) {
  if (!post) {
    return <PostCardSkeleton />;
  }

  const { title, content, slug, userId, createdAt } = post;
  const postCreatedAt = createdAt || new Date().toISOString();

  // Default values for avatar and username if userId is missing
  const authorProfilePicture = userId?.profilePicture || "default-avatar-url";
  const authorUsername = userId?.username || "anonymous";

  return (
    <div className="group relative border-2 border-teal-500 h-[450px] overflow-hidden rounded-lg w-[430px] sm:w-full transition-all">
      <Link to={`/post/${slug}`}>
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
          to={`/post/${slug}`}
          className="z-10 bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
 */}
    </div>
  );
}
