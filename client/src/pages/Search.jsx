import { Button, Select, Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import HomeSidebar from "./HomeSidebar";
import codingGif from "../assets/a2.gif";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "nocategory",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [topPosts, setTopPosts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const [urlSearchTerm, setUrlSearchTerm] = useState("");
  const [inputSearchTerm, setInputSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setUrlSearchTerm(searchTermFromUrl);
      setInputSearchTerm(searchTermFromUrl.replace(/\+/g, " "));
    } else {
      setUrlSearchTerm("");
      setInputSearchTerm("");
    }
  }, [location.search]);

  useEffect(() => {
    if (location.pathname === "/search") {
      setInputSearchTerm(urlSearchTerm.replace(/\+/g, " "));
    } else {
      setInputSearchTerm("");
    }
  }, [location.pathname, urlSearchTerm]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const sanitizedSearchTerm = inputSearchTerm.trim().replace(/\s+/g, "+");
    navigate(`/search?searchTerm=${sanitizedSearchTerm}`);
  };

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
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "nocategory";

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);

      setLoading(false);
      setShowMore(data.posts.length === 9);
    };

    fetchTopPosts();
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    navigate(`/search?${urlParams.toString()}`);
  };

  const handleRemoveFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "nocategory",
    });

    navigate("/search");
  };

  const handleShowMore = async () => {
    setIsFetchingMore(true);
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      setIsFetchingMore(false);
      return;
    }
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
    setShowLess(true);
    setIsFetchingMore(false);
  };

  const handleShowLess = () => {
    setPosts(posts.slice(0, 9));
    setShowLess(false);
    setShowMore(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar
        className=" border-b md:border-r m-auto md:m-0
       border-gray-500 md:sticky top-0  h-fit"
      >
        <form className="flex flex-col gap-8 mb-3" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              {sidebarData.searchTerm.trim() === "" && (
                <option value="nocategory">Select a category</option>
              )}
              <option value="uncategorized">Uncategorized</option>
              <option value="html">HTML and CSS</option>
              <option value="javascript">Javascript, HTML and CSS</option>
              <option value="reactjs">React js and Tailwind</option>
              <option value="threejs">Three js</option>
              <option value="typscript">TypeScript</option>
              <option value="mongo">Mongo db</option>
              <option value="node">Node and Express</option>
              <option value="mern">MERN Stack</option>
              <option value="nextjs">MERN and NEXT js</option>
              <option value="videoapp">WebSockets and WebRTC</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
          <button
            type="button"
            onClick={handleRemoveFilters}
            className="w-full h-full inline-block border-2 hover:bg-cyan-900 hover:text-cyan-100 border-cyan-900 rounded-md text-center p-2 dark:hover:bg-cyan-900 dark:text-cyan-100 transition-all duration-300"
          >
            Remove Filters
          </button>
        </form>
        <HomeSidebar />
      </Sidebar>
      <div className="w-full flex flex-col gap-3 mt-3">
        <form onSubmit={handleSubmitSearch} className="w-fit pl-3">
          <TextInput
            type="text"
            placeholder="search and click enter"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={inputSearchTerm}
            onChange={(e) => {
              setInputSearchTerm(e.target.value);
            }}
          />
        </form>
        <div>
          <div className="w-full h-[300px] p-3 ">
            <img
              src={codingGif}
              alt="coding gif"
              className="w-full h-full object-cover rounded-lg "
            />
          </div>
          <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-3 text-center">
            Project results:
          </h1>
        </div>
        <div className=" rounded-lg backdrop-blur-lg bg-white bg-opacity-5">
          <div className="p-3 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold ">My Top Projects</h2>
            <p className="text-xs ">biooids top projects</p>
          </div>

          <div className="home-container gap-3 flex flex-col p-3 sm:grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            ) : topPosts.length > 0 ? (
              topPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="text-xl font-semibold text-red-600">
                No Top projects available yet!.
              </div>
            )}
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold ">All Projects</h2>
          <p className="text-xs ">All biooids projects</p>
        </div>
        <div className="top-projects flex flex-wrap justify-center items-center sm:grid gap-4">
          {loading &&
            Array.from({ length: 9 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}

          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}

          {!loading &&
            posts.length > 0 &&
            posts.filter((post) => post.mainPost).length === 0 && (
              <p className="text-xl text-gray-500">No posts found.</p>
            )}

          {!loading &&
            posts
              .filter((post) => post.mainPost)
              .map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        <div className="m-7 flex flex-col md:flex-row gap-5">
          {showMore && (
            <button
              onClick={handleShowMore}
              className={`w-full h-full inline-bloc text-cyan-100 bg-cyan-900 rounded-md text-center p-5 dark:bg-cyan-900 dark:text-cyan-100 font-bold transition-all duration-300 ${
                isFetchingMore ? "cursor-not-allowed" : "hover:underline "
              }`}
              disabled={isFetchingMore}
            >
              {isFetchingMore ? (
                <div className="flex items-center gap-2 justify-center">
                  Loading...
                </div>
              ) : (
                "Show More ↓"
              )}
            </button>
          )}
          {showLess && (
            <button
              onClick={handleShowLess}
              className="w-full h-full inline-bloc text-cyan-100 bg-cyan-900 rounded-md text-center p-5 dark:bg-cyan-900 dark:text-cyan-100 hover:underline font-bold transition-all duration-300"
            >
              Show Less ↑
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
