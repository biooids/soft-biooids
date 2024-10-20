import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import myImage from "../assets/mee.gif";
import { FaTiktok } from "react-icons/fa6";

import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

import {
  GiBrain,
  GiFizzingFlask,
  GiStoneCrafting,
  GiCoffeeCup,
} from "react-icons/gi";

import HomeSidebar from "./HomeSidebar";
import { Button, Carousel, Label, TextInput } from "flowbite-react";
import TechStack from "./TechStack";

export default function Home() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestResearches, setLatestResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainPosts, setMainPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  const fetchTopPosts = async () => {
    try {
      const res = await fetch("/api/post/getTopPosts");
      const data = await res.json();
      setTopPosts(data.topPosts);
    } catch (error) {
      console.error("Failed to fetch top posts", error);
    }
  };

  useEffect(() => {
    fetchTopPosts();
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
        setMainPosts(mainPosts);

        setLatestPosts(formattedPosts);
        setLatestArticles(formattedArticles);
        setLatestResearches(formattedResearches);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex  ">
        <nav className="w-0 md:w-[16%] md:p-3 border-r-2 border-slate-700">
          <HomeSidebar />
        </nav>
        <div className="flex flex-col gap-6 px-3 w-full md:w-[84%] mx-auto mb-10">
          <div className="home-page-1 text-cyan-500 md:h-[70vh] md:grid md:grid-cols-2 flex flex-col  ">
            <div className="flex flex-col justify-center gap-3  p-5 ">
              <h1 className="font-bold sm:text-2xl lg:text-3xl">
                Hi, What's Good ?!
              </h1>
              <h2 className=" text-xs sm:text-sm  p-3 ">
                Discover and contribute to a world by sharing your articles,
                projects, and share your research to the world at Soft-Biooids.
                Connect with a community of like-minded individuals passionate
                about knowledge and innovation.
              </h2>
              <p className=" flex gap-3 items-center">
                I am a full stack developer:{" "}
                <a
                  href="https://github.com/biooids"
                  className=" font-bold text-3xl p-3 backdrop-blur-lg rounded-lg "
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </p>
              <div className=" backdrop-blur-lg p-5 rounded-lg flex flex-col gap-3 ">
                <div className="flex gap-3 ">
                  <div className=" h-3 w-3 bg-cyan-500 rounded-full"></div>
                  <div className=" h-3 w-3 bg-cyan-500 rounded-full"></div>
                  <div className=" h-3 w-3 bg-cyan-500 rounded-full"></div>
                </div>
                <p className="text-sm">
                  " const passion = (programmer) ={">"}{" "}
                  programmer.includes('love') ? true : false stop it ; <br />
                  console.log( passion(me) ); <br />$ true "
                </p>
              </div>
            </div>
            <div className="top-0 h-full relative flex  text-3xl justify-around items-end ">
              <a
                href="mailto:ehwapyongm@gmail.com"
                className=" hover:text-cyan-300 p-3 backdrop-blur-lg rounded-lg "
                target="_blank"
              >
                <MdEmail className="" />
              </a>
              <a
                href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
                className=" hover:text-cyan-300 p-3 backdrop-blur-lg rounded-lg "
                target="_blank"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="https://www.tiktok.com/@navi_biooids"
                className=" hover:text-cyan-300 p-3 backdrop-blur-lg rounded-lg"
                target="_blank"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.instagram.com/soft_biooids/"
                className=" hover:text-cyan-300 p-3 backdrop-blur-lg rounded-lg"
                target="_blank"
              >
                <AiFillInstagram />
              </a>
            </div>

            {/* <img
                src={myImage}
                alt="my image"
                className="h-[200px] w-full md:h-full md:absolute mx-auto rounded-md object-cover"
              /> */}
          </div>

          <div className="home-page-2 text-cyan-500 h-56 sm:h-64 xl:h-80 2xl:h-96 lg:text-4xl md:text-2xl">
            <Carousel
              pauseOnHover
              slideInterval={1000}
              className="backdrop-blur-lg"
            >
              <div className="font-bold flex flex-col gap-3 h-full items-center justify-center p-4 rounded-lg shadow-lg">
                <GiBrain className=" text-5xl md:text-6xl lg:text-7xl animate-bounce" />
                <p className=" text-sm md:text-xl lg:text-2xl mt-4 text-center">
                  Empower the world with knowledge. Let's create, innovate, and
                  share.
                </p>
                <Link
                  to="/articles"
                  className="bg-white w-fit p-3 rounded-lg bg-opacity-5 hover:bg-opacity-10 text-sm"
                >
                  Explore Articles
                </Link>
              </div>
              <div className="font-bold flex flex-col gap-3 h-full items-center justify-center  p-4 rounded-lg shadow-lg">
                <GiStoneCrafting className=" text-5xl md:text-6xl lg:text-7xl animate-pulse" />
                <p className=" text-sm md:text-xl lg:text-2xl mt-4 text-center">
                  Crafting cool projects that make an impact.
                </p>
                <Link
                  to="/search"
                  className="bg-white w-fit p-3 rounded-lg bg-opacity-5 hover:bg-opacity-10 text-sm"
                >
                  Check out my creations
                </Link>
              </div>
              <div className="font-bold flex flex-col gap-3 h-full items-center justify-center  p-4 rounded-lg shadow-lg">
                <GiFizzingFlask className=" text-5xl md:text-6xl lg:text-7xl animate-ping" />
                <p className=" text-sm md:text-xl lg:text-2xl mt-4 text-center">
                  Discover innovative research that sparks change.
                </p>
                <Link
                  to="/researches"
                  className="bg-white w-fit p-3 rounded-lg bg-opacity-5 hover:bg-opacity-10 text-sm"
                >
                  See my latest studies
                </Link>
              </div>
            </Carousel>
          </div>

          <div className="home-page-3 text-cyan-500 flex flex-col sm:grid grid-cols-3 grid-rows-3 gap-4 ">
            <TechStack />

            <div className="col-start-3 row-start-1  p-3 rounded-lg  ">
              <p>Buy This Web App For:</p>
              <div className="flex gap-1 text-red-500">
                <span className="text-nowrap">1,150</span>
                <span className="text-nowrap line-through">2,050</span>
                USD
              </div>
              <p className="mt-2 mb-5">Contact me for deal:</p>
              <div className="text-2xl flex justify-between pb-5 border-b-2 border-cyan-500">
                <a
                  href="mailto:ehwapyongm@gmail.com"
                  className=""
                  target="_blank"
                >
                  <MdEmail />
                </a>
                <a
                  href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
                  className=""
                  target="_blank"
                >
                  <IoLogoWhatsapp />
                </a>
                <a
                  href="https://www.instagram.com/soft_biooids/"
                  className="dark"
                  target="_blank"
                >
                  <AiFillInstagram />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 P-3   border-l-8 p-3 border-cyan-500  rounded-xl row-span-2 col-start-3 row-start-2 ">
              <h4 className="text-lg font-semibold pb-5">Services</h4>
              <ul className="list-disc list-inside">
                <li>Web Development</li>
                <li>RESTful APIs</li>
                <li>3D Websites</li>
                <li>Responsive Design</li>
                <li>Tech Advices</li>
                <li>I Upload some lessons</li>
              </ul>
              <div className="flex flex-col gap-3">
                <p>At the end of the day, I just need some support </p>
                <Button outline>
                  Buy me coffee{" "}
                  <GiCoffeeCup className="text-amber-600 text-xl " />
                </Button>
                <p className="text-red-600 text-xs">
                  Payment system doesn't function yet
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg col-span-2 col-start-1 row-start-3   flex flex-col items-center justify-around">
              <FaComputer className="text-7xl" />
              <p className="">
                Are you ready to take your projects to the next level with a
                skilled freelancer who thrives on collaboration? I am a
                passionate freelancer seeking to join forces with a powerful
                team, where together we can achieve extraordinary results.
              </p>
            </div>
          </div>
          <section className="home-page-4 text-cyan-500 flex flex-col gap-5">
            <div className=" rounded-lg backdrop-blur-lg bg-white bg-opacity-5">
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">My Top Projects</h2>
                <span className="text-xs ">biooids top projects</span>
                <Link
                  to="/search"
                  className=" bg-white bg-opacity-5 hover:bg-opacity-10 p-2 rounded-lg flex justify-center items-center"
                >
                  See more
                </Link>
              </div>
              <div className="home-container gap-3 flex flex-col p-3 sm:grid">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                ) : topPosts.length > 0 ? (
                  topPosts
                    .slice(0, 6)
                    .map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                  <div className="text-xl font-semibold text-red-600">
                    No Top projects available yet !.
                  </div>
                )}
              </div>
            </div>

            <div className=" rounded-lg backdrop-blur-lg bg-white bg-opacity-5">
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">All Projects</h2>
                <span className="text-xs ">All biooids projects</span>
                <Link
                  to="/search"
                  className=" bg-white bg-opacity-5 hover:bg-opacity-10 p-2 rounded-lg flex justify-center items-center"
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
                    No projects available yet !.
                  </div>
                )}
              </div>
            </div>

            <div className=" rounded-xl  backdrop-blur-lg bg-white bg-opacity-5">
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">Latest Articles:</h2>
                <span className="text-xs ">you can upload yours too 🤷‍♂️!</span>
                <Link
                  to="/articles"
                  className=" bg-white bg-opacity-5 hover:bg-opacity-10 p-2 rounded-lg flex justify-center items-center"
                >
                  See more
                </Link>
              </div>
              <div className="home-container gap-3 flex flex-col p-3 sm:grid">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                ) : latestArticles.length > 0 ? (
                  latestArticles.map((article, index) => (
                    <PostCard key={index} post={article} />
                  ))
                ) : (
                  <div className="text-xl font-semibold text-red-600">
                    No articles posts available.
                  </div>
                )}
              </div>
            </div>

            <div className=" rounded-xl    backdrop-blur-lg bg-white bg-opacity-5">
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">Latest Researches:</h2>
                <span className="text-xs text-purple-300">
                  you can upload yours too 🤷‍♂️!
                </span>
                <Link
                  to="/researches"
                  className=" bg-white bg-opacity-5 hover:bg-opacity-10 p-2 rounded-lg flex justify-center items-center"
                >
                  See more
                </Link>
              </div>
              <div className="home-container gap-3 flex flex-col p-3 sm:grid">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                ) : latestResearches.length > 0 ? (
                  latestResearches.map((research, index) => (
                    <PostCard key={index} post={research} />
                  ))
                ) : (
                  <div className="text-xl font-semibold text-red-600">
                    No research posts available.
                  </div>
                )}
              </div>
            </div>
          </section>

          <CallToAction />
        </div>
      </div>
    </div>
  );
}
