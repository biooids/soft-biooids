import { Navbar, TextInput, Select } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import codingGif from "../../assets/a3.gif";

function Researches() {
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
      navigate(`/researches?${searchParams.toString()}`);
      isSearchAction.current = false;
    }
  }, [searchTerm, category, navigate]);

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state?.category]);

  const handleAllResearchesClick = () => {
    setSearchTerm("");
    setCategory("");
  };

  const handleMyResearchesClick = () => {
    setSearchTerm("");
    setCategory("");
  };

  const handleCreateClick = () => {
    setSearchTerm("");
    setCategory("");
    if (currentUser) {
      navigate("create-research");
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
          className="w-full h-full object-cover object-center rounded-lg "
        />
      </div>
      <Navbar className="w-full">
        <div className="flex gap-3 flex-wrap">
          <Link
            to="."
            relative="path"
            className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
            onClick={handleAllResearchesClick}
          >
            All Researches
          </Link>
          <Link
            to="my-researches"
            onClick={handleMyResearchesClick}
            relative="path"
            className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
          >
            My Researches
          </Link>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <TextInput
              type="text"
              placeholder="Search researches"
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
              <option value="uncategorized">Uncategorized</option>
              <option value="agriculture">Agriculture</option>
              <option value="anthropology">Anthropology</option>
              <option value="architecture">Architecture</option>
              <option value="astronomy">Astronomy</option>
              <option value="biology">Biology</option>
              <option value="business">Business</option>
              <option value="chemistry">Chemistry</option>
              <option value="computer_science">Computer Science</option>
              <option value="economics">Economics</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="geology">Geology</option>
              <option value="history">History</option>
              <option value="linguistics">Linguistics</option>
              <option value="literature">Literature</option>
              <option value="marine_biology">Marine Biology</option>
              <option value="materials_science">Materials Science</option>
              <option value="music">Music</option>
              <option value="philosophy">Philosophy</option>
              <option value="physics">Physics</option>
              <option value="political_science">Political Science</option>
              <option value="psychology">Psychology</option>
              <option value="sociology">Sociology</option>
              <option value="space_exploration">Space Exploration</option>
              <option value="statistics">Statistics</option>
              <option value="theater">Theater</option>
              <option value="zoology">Zoology</option>
            </Select>
          </form>
          <button
            onClick={handleCreateClick}
            className="p-3 hover:dark:bg-slate-600 hover:underline dark:bg-slate-700 rounded-md"
          >
            Create Something
          </button>
        </div>
      </Navbar>
      <section>
        <Outlet context={{ searchTerm, category }} />
      </section>
    </section>
  );
}

export default Researches;
