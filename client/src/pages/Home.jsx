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

import { GiBrain, GiFizzingFlask, GiStoneCrafting } from "react-icons/gi";

import HomeSidebar from "./HomeSidebar";
import { Carousel } from "flowbite-react";

export default function Home() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestResearches, setLatestResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainPosts, setMainPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, articlesRes, researchesRes] = await Promise.all([
          fetch("/api/post/getPosts"),
          fetch("/api/article/getArticles"),
          fetch("/api/research/getResearches"),
        ]);

        const postsData = await postsRes.json();
        const articlesData = await articlesRes.json();
        const researchesData = await researchesRes.json();

        // Ensure type is set for each fetched data
        const formattedPosts = postsData.posts
          .slice(0, 6)
          .map((post) => ({ ...post, type: "post" }));
        const formattedArticles = articlesData.articles
          .slice(0, 6)
          .map((article) => ({ ...article, type: "article" }));
        const formattedResearches = researchesData.researches
          .slice(0, 6)
          .map((research) => ({ ...research, type: "research" }));

        // Filter main posts
        const mainPosts = postsData.posts.filter((post) => post.mainPost);

        setLatestPosts(formattedPosts);
        setLatestArticles(formattedArticles);
        setLatestResearches(formattedResearches);
        setMainPosts(mainPosts);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex">
        <nav className="w-0 md:w-[16%] md:p-3 border-r-2 border-slate-700">
          <HomeSidebar />
        </nav>
        <div className="flex flex-col gap-6 px-3 w-full md:w-[84%] mx-auto mb-10">
          <div className="md:h-[70vh] md:grid md:grid-cols-2 flex flex-col">
            <div className="flex flex-col justify-center gap-3 bg-slate-950 bg-opacity-20 p-5">
              <h1 className="font-bold sm:text-2xl lg:text-3xl">
                Welcome to soft-biooids
              </h1>
              <h2 className="dark:text-cyan-400 text-xs sm:text-sm">
                Discover and contribute to a world by sharing your articles,
                projects, and share your research to the world at Soft-Biooids.
                Engage with a platform that allows you to share and explore
                content on various topics you want. Connect with a community of
                like-minded individuals passionate about knowledge and
                innovation.
              </h2>
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
            <div className="dark:text-purple-500 text-xs sm:text-sm border-b-8 p-5 gap-5 flex flex-col border-t-8 border-cyan-400 rounded-xl sm:w-[60%]">
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
                  <FaGithub className="text-slate-950 " />
                  <span className="text-slate-950 ">GitHub</span>
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
                    <TbBrandThreejs className="text-slate-950 " />
                    <span className="text-slate-950 ">Three.js</span>
                  </div>
                  <div className="flex flex-col items-center border-b-4 border-purple-500 rounded-lg p-2">
                    <TiCloudStorage className="text-blue-500" />
                    <span className="text-blue-500">Cloud Storage</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="sm:w-[20%]">
              I am a free lancer looking for a powerful team
            </p>
          </div>
          <div className=" dark:text-purple-500 dark:bg-slate-950  bg-slate-300 h-fit  border-l-4 p-3 border-cyan-500 rounded-xl">
            <h4 className="text-lg font-semibold pb-5">Services</h4>
            <ul className="list-disc list-inside">
              <li>Web Development</li>
              <li>RESTful APIs</li>
              <li>3D Websites</li>
              <li>Responsive Design</li>
              <li>Tech Advices</li>
              <li>I Upload some lessons</li>
            </ul>
          </div>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 lg:text-4xl md:text-2xl">
            <Carousel pauseOnHover>
              <div className="font-bold flex flex-col h-full items-center justify-center bg-slate-300 dark:bg-slate-950  p-4">
                <GiBrain className="text-cyan-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
                <p className="text-purple-500 text-base sm:text-lg md:text-xl lg:text-2xl mt-4 text-center">
                  Share the knowledge with the world
                </p>
              </div>
              <div className="font-bold flex flex-col h-full items-center justify-center bg-slate-300 dark:bg-slate-950  p-4">
                <GiStoneCrafting className="text-cyan-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
                <p className="text-purple-500 text-base sm:text-lg md:text-xl lg:text-2xl mt-4 text-center">
                  I Upload a collection of cool projects
                </p>
              </div>
              <div className="font-bold flex flex-col h-full items-center justify-center bg-slate-300 dark:bg-slate-950  p-4">
                <GiFizzingFlask className="text-cyan-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
                <p className="text-purple-500 text-base sm:text-lg md:text-xl lg:text-2xl mt-4 text-center">
                  Share your latest research with the world
                </p>
              </div>
            </Carousel>
          </div>
          <div className="bg-slate-950 rounded-xl">
            <div className="p-3 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-500">
                Latest Articles:
              </h2>
              <span className="text-xs text-purple-300">
                you can upload yours too 🤷‍♂️!
              </span>
              <Link
                to="/articles"
                className="text-cyan-500 bg-slate-600 hover:bg-slate-700 p-2 rounded-lg flex justify-center items-center"
              >
                See more
              </Link>
            </div>
            <div className="home-container gap-3 flex flex-col p-3 sm:grid">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                : latestArticles.map((article, index) => (
                    <PostCard key={index} post={article} />
                  ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl">
            <div className="p-3 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-500">
                My Top Projects
              </h2>
              <span className="text-xs text-purple-300">biooids projects</span>
              <Link
                to="/search"
                className="text-cyan-500 bg-slate-600 hover:bg-slate-700 p-2 rounded-lg flex justify-center items-center"
              >
                See more
              </Link>
            </div>
            <div className="home-container gap-3 flex flex-col p-3 sm:grid">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))
              ) : mainPosts.length > 0 ? (
                mainPosts
                  .slice(0, 6)
                  .map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <div className="text-xl font-semibold text-red-600">
                  No main posts available.
                </div>
              )}
            </div>

            <div className="p-3 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-500">
                Latest Projects & proposal:
              </h2>
              <span className="text-xs text-purple-300">biooids projects</span>
              <Link
                to="/search"
                className="text-cyan-500 bg-slate-600 hover:bg-slate-700 p-2 rounded-lg flex justify-center items-center"
              >
                See more
              </Link>
            </div>
            <div className="home-container gap-3 flex flex-col p-3 sm:grid">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                : latestPosts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl">
            <div className="p-3 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-500">
                Latest Researches:
              </h2>
              <span className="text-xs text-purple-300">
                you can upload yours too 🤷‍♂️!
              </span>
              <Link
                to="/researches"
                className="text-cyan-500 bg-slate-600 hover:bg-slate-700 p-2 rounded-lg flex justify-center items-center"
              >
                See more
              </Link>
            </div>
            <div className="home-container gap-3 flex flex-col p-3 sm:grid">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                : latestResearches.map((research, index) => (
                    <PostCard key={index} post={research} />
                  ))}
            </div>
          </div>

          <CallToAction />
        </div>
      </div>
    </div>
  );
}
