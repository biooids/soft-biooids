import { useEffect, useState } from "react";
import PostCardSkeleton from "../../components/PostCardSkeleton";
import PostCard from "../../components/PostCard";
import { Select } from "flowbite-react";

function Collections() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [category, setCategory] = useState("all"); // State to track the selected category

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/post/getposts`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      const nonMainOrTopPosts = data.posts.filter(
        (post) => !post.mainPost && !post.topPost
      );
      // Filter by category if a specific one is selected
      const filteredPosts =
        category === "all"
          ? nonMainOrTopPosts
          : nonMainOrTopPosts.filter((post) => post.category === category);

      setPosts(filteredPosts);
      setLoading(false);
      setShowMore(filteredPosts.length === 9);
    };

    fetchPosts();
  }, [category]); // Re-fetch when category changes

  const handleShowMore = async () => {
    setIsFetchingMore(true);
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
    if (!res.ok) {
      setIsFetchingMore(false);
      return;
    }
    const data = await res.json();
    const nonMainPosts = data.posts.filter((post) => !post.mainPost);
    const filteredPosts =
      category === "all"
        ? nonMainPosts
        : nonMainPosts.filter((post) => post.category === category);

    setPosts([...posts, ...filteredPosts]);
    setShowMore(filteredPosts.length === 9);
    setShowLess(true);
    setIsFetchingMore(false);
  };

  const handleShowLess = () => {
    setPosts(posts.slice(0, 9));
    setShowLess(false);
    setShowMore(true);
  };

  return (
    <div>
      {/* Category Selector */}
      <div className="mb-4 flex justify-center mt-3 ">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="html">HTML and CSS</option>
          <option value="javascript">Javascript, HTML and CSS</option>
          <option value="reactjs">React JS and Tailwind</option>
          <option value="threejs">Three JS</option>
          <option value="typescript">TypeScript</option>
          <option value="mongo">Mongo DB</option>
          <option value="node">Node and Express</option>
          <option value="mern">MERN Stack</option>
          <option value="nextjs">MERN and Next JS</option>
          <option value="videoapp">WebSockets and WebRTC</option>
        </Select>
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
          posts.map((post) => <PostCard key={post._id} post={post} />)}

        <div className="m-7 flex flex-col md:flex-row gap-5">
          {showMore && (
            <button
              onClick={handleShowMore}
              className={`w-full h-full inline-bloc text-cyan-100 bg-cyan-900 rounded-md text-center p-5 dark:bg-cyan-900 dark:text-cyan-100 font-bold transition-all duration-300 ${
                isFetchingMore ? "cursor-not-allowed" : "hover:underline"
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

export default Collections;
