import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

import { SiMongodb } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io5";
import { SiExpress } from "react-icons/si";

import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTailwindcss } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { SiMongoose } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { TiCloudStorage } from "react-icons/ti";

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
        console.log(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className=" font-bold lg:text-6xl text-center">
          Welcome to soft-biooid
        </h1>
        <p className="dark:text-cyan-300 text-xs sm:text-sm text-center">
          Here you'll find a variety of articles and source code about my
          projects. I'm building some cool stuff along the way like full stack
          apps with MERN stack, HTML, CSS, JAVASCRIPT, even 3D websites using
          3JS and more. You may also see some tutorials on how to build certain
          features or maybe even some sneak peeks at upcoming ideas.
        </p>

        <div className="flex gap-5 relative  flex-col sm:flex-row">
          <div className="w-full sm:w-[20%] sm:sticky  h-fit top-0 flex flex-col gap-1 ">
            <p className="sm:text-center "> Buy This Web App For : </p>
            <div className="flex gap-1 sm:justify-center">
              <span className="text-nowrap text-red-500">550 USD</span>
              <span className="text-nowrap text-red-500 line-through">
                600 USD
              </span>
            </div>
            <Button className="w-fit sm:w-full">Buy This Site</Button>
          </div>
          <div className="dark:text-purple-700 text-xs sm:text-sm border-b-8 p-5 gap-5 flex flex-col border-t-8 border-cyan-400 rounded-xl sm:w-[60%] ">
            <h3 className=" font-semibold text-center">Tech Stack</h3>
            <div></div>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <SiMongodb className=" text-green-500" />
                <span className="text-green-500">MongoDB</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <SiExpress className=" text-gray-500" />
                <span className="text-gray-500">Express</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <FaReact className=" text-blue-500" />
                <span className="text-blue-500">React</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <IoLogoNodejs className=" text-green-500" />
                <span className="text-green-500">Node.js</span>
              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <FaHtml5 className=" text-orange-600" />
                <span className="text-orange-600">HTML5</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <FaCss3Alt className=" text-blue-600" />
                <span className="text-blue-600">CSS3</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <IoLogoJavascript className=" text-yellow-500" />
                <span className="text-yellow-500">JavaScript</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <SiTailwindcss className=" text-blue-400" />
                <span className="text-blue-400">Tailwind CSS</span>
              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <FaGitAlt className=" text-orange-500" />
                <span className="text-orange-500">Git</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <FaGithub className=" text-black" />
                <span className="text-black">GitHub</span>
              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <SiRedux className=" text-purple-600" />
                <span className="text-purple-600">Redux</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <IoLogoFirebase className=" text-yellow-400" />
                <span className="text-yellow-400">Firebase</span>
              </div>
              <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                <SiMongoose className=" text-red-600" />
                <span className="text-red-600">Mongoose</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg">Currently learning:</h4>
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiNextdotjs className=" text-black" />
                  <span className="text-black">Next.js</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <SiTypescript className=" text-blue-500" />
                  <span className="text-blue-500">TypeScript</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <TbBrandThreejs className=" text-black" />
                  <span className="text-black">Three.js</span>
                </div>
                <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                  <TiCloudStorage className=" text-blue-500" />
                  <span className="text-blue-500">Cloud Storage</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-[20%]">
            Am a free lancer you can{" "}
            <span className="text-nowrap text-purple-500 underline">
              Hire me
            </span>
          </div>
        </div>
        <Link
          to="/search"
          className="text-sm sm:text-lg  dark:text-cyan-100 font-bold  m-auto hover:dark:text-cyan-300 underline w-fit"
        >
          Search projects &#8594;
        </Link>
      </div>
      <div className="p-3 bg-cyan-100 dark:bg-cyan-950">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center dark:text-cyan-300">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4">
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
    </div>
  );
}
