import { Navbar, TextInput, Select } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import codingGif from "../../assets/a.gif";

function Updates() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchAction = useRef(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(location.state?.category || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchTerm.trim()) {
      searchParams.set("searchTerm", searchTerm.trim());
    }
    if (category) {
      searchParams.set("category", category);
    }
    isSearchAction.current = true;
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (isSearchAction.current) {
      const searchParams = new URLSearchParams();
      if (searchTerm.trim()) {
        searchParams.set("searchTerm", searchTerm.trim());
      }
      if (category) {
        searchParams.set("category", category);
      }
      navigate(`/updates?${searchParams.toString()}`);
      isSearchAction.current = false;
    }
  }, [searchTerm, category, navigate]);

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state?.category]);

  const handleAllUpdatesClick = () => {
    setSearchTerm("");
    setCategory("");
  };

  const handleMyUpdatesClick = () => {
    setSearchTerm("");
    setCategory("");
  };

  const handleCreateClick = () => {
    setSearchTerm("");
    setCategory("");
    if (currentUser) {
      navigate("/updates/create-update");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <section className="b-black w-full">
      <div className="w-full h-[300px] p-3 ">
        <img
          src={codingGif}
          alt="coding gif"
          className="w-full h-full object-cover rounded-lg "
        />
      </div>
      <Navbar className="w-full">
        <div className="flex gap-3 flex-wrap">
          <Link
            to="."
            relative="path"
            className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
            onClick={handleAllUpdatesClick}
          >
            All Updates
          </Link>
          {currentUser && currentUser.isAdmin && (
            <Link
              to="my-updates"
              onClick={handleMyUpdatesClick}
              relative="path"
              className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
            >
              My Updates
            </Link>
          )}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <TextInput
              type="text"
              placeholder="Search updates"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                isSearchAction.current = true;
              }}
              className="rounded-md"
            />
            <Select
              placeholder="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                isSearchAction.current = true;
              }}
              className="rounded-md"
            >
              <option value="">All Categories</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="userExperience">User Experience</option>
              <option value="bug">Bugs</option>
              <option value="features"> New Features</option>
              <option value="enhancement">Enhancements</option>
              <option value="security">Security</option>
              <option value="bugFixes">Bug Fixes</option>
              <option value="documentation">Documentation</option>
              <option value="other">Other</option>
              <option value="tips">Tips</option>
              <option value="resources">Resources</option>
              <option value="news">News</option>
              <option value="tutorials">Tutorials</option>
              <option value="videos">Videos</option>
              <option value="books">Books</option>
            </Select>
          </form>
          {currentUser && currentUser.isAdmin && (
            <button
              onClick={handleCreateClick}
              className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
            >
              Create Update
            </button>
          )}
        </div>
      </Navbar>
      <section>
        <Outlet context={{ searchTerm, category }} />
      </section>
    </section>
  );
}

export default Updates;
