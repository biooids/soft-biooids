import { Button, Select, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    if (searchTermFromUrl && searchTermFromUrl.trim() !== "") {
      setSidebarData({
        ...sidebarData,
        category: "nocategory",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "nocategory";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    if (sidebarData.searchTerm.trim() !== "") {
      urlParams.set("searchTerm", "");
    } else {
      urlParams.set("searchTerm", sidebarData.searchTerm);
    }

    navigate(`/search?${urlParams.toString()}`);
  };

  // Function to handle removing filters
  const handleRemoveFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "nocategory", // Reset category to "Select a category"
    });

    // Update URL to http://localhost:5173/search
    navigate("/search");
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setShowLess(true);
    }
  };

  const handleShowLess = () => {
    setPosts(posts.slice(0, 9));
    setShowLess(false);
    setShowMore(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <div>
              <label className="font-semibold">Sort:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.sort}
                id="sort"
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>
          </div>
          <div>
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
              <option value="videoapp">WebSockets and WebRTC </option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
          <button
            type="button"
            onClick={handleRemoveFilters} // Call function to reset filters
            className="w-full h-full inline-block border-2 hover:bg-cyan-900 hover:text-cyan-100 border-cyan-900 rounded-md text-center p-2 dark:hover:bg-cyan-900 dark:text-cyan-100 transition-all duration-300 "
          >
            Remove them
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {loading && <Spinner size="xl" />}
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full h-full inline-bloc text-cyan-100 bg-cyan-900 rounded-md text-center p-1 dark:bg-cyan-900 dark:text-cyan-100 hover:underline font-bold transition-all duration-300 "
            >
              Show More &darr;
            </button>
          )}
          {showLess && (
            <button
              onClick={handleShowLess}
              className="w-full h-full inline-bloc text-cyan-100 bg-cyan-900 rounded-md text-center p-1 dark:bg-cyan-900 dark:text-cyan-100 hover:underline font-bold transition-all duration-300 "
            >
              Show Less &uarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
