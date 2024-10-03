import React from "react";
import { FaUserCircle, FaHome } from "react-icons/fa";
import {
  GiStoneCrafting,
  GiBrain,
  GiFizzingFlask,
  GiNewspaper,
} from "react-icons/gi";
import { MdCollections } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";

function HomeSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleUpdateProfileClick = () => {
    navigate("/dashboard?tab=profile");
  };
  const isSearchRoute = location.pathname === "/search";

  return (
    <>
      <div className="md:block hidden sticky top-5">
        <div
          onClick={handleUpdateProfileClick}
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg  ${
            location.pathname === "/profile" ? "bg-slate-600" : ""
          }`}
        >
          <FaUserCircle className="text-2xl font-bold" />
          <span>Profile</span>
        </div>

        <Link
          to="/home"
          className={`  cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/home" ? "bg-slate-600" : ""
          }`}
        >
          <FaHome className="text-2xl font-bold" />
          <span>Home</span>
        </Link>

        <Link
          to="/articles"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/articles" ? "bg-slate-600" : ""
          }`}
        >
          <GiBrain className="text-2xl font-bold" />
          <span>Articles</span>
        </Link>

        <Link
          to="/researches"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/researches" ? "bg-slate-600" : ""
          }`}
        >
          <GiFizzingFlask className="text-2xl font-bold" />
          <span>Research</span>
        </Link>

        <Link
          to="/updates"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/updates" ? "bg-slate-600" : ""
          }`}
        >
          <GiNewspaper className="text-2xl font-bold" />
          <span>Updates</span>
        </Link>

        <Link
          to="/search"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/search" ? "bg-slate-600" : ""
          }`}
        >
          <GiStoneCrafting className="text-2xl font-bold" />
          <span>My Projects</span>
        </Link>
        <Link
          to="/collections"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/collections" ? "bg-slate-600" : ""
          }`}
        >
          <MdCollections className="text-2xl font-bold" />
          <span>Collections</span>
        </Link>

        <Link
          to="/ads"
          className={` cursor-pointer flex hover:bg-slate-600  items-center p-2 gap-2 rounded-lg ${
            location.pathname === "/ads" ? "bg-slate-600" : ""
          }`}
        >
          <RiAdvertisementFill className="text-2xl font-bold" />
          <span>Ads+Bonus</span>
        </Link>
      </div>

      {/* Bottom navigation for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 bg-black text-cyan-500 border-purple-500 md:hidden flex justify-around items-center py-2 z-50">
        <Link
          to="/home"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/home" ? "bg-purple-900" : ""
          }`}
        >
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/articles"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/articles" ? "bg-purple-900" : ""
          }`}
        >
          <GiBrain className="text-xl" />
          <span className="text-xs">Articles</span>
        </Link>
        <Link
          to="/researches"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/researches" ? "bg-purple-900" : ""
          }`}
        >
          <GiFizzingFlask className="text-xl" />
          <span className="text-xs">Researches</span>
        </Link>
        <Link
          to="/search"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/search" ? "bg-purple-900" : ""
          }`}
        >
          <GiStoneCrafting className="text-xl" />
          <span className="text-xs">Projects</span>
        </Link>
        <Link
          to="/updates"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/updates" ? "bg-purple-900" : ""
          }`}
        >
          <GiNewspaper className="text-xl" />
          <span className="text-xs">Updates</span>
        </Link>

        <Link
          to="/ads"
          className={`flex flex-col justify-center items-center p-1 rounded-lg ${
            location.pathname === "/ads" ? "bg-purple-900" : ""
          }`}
        >
          <RiAdvertisementFill className="text-xl" />
          <span className="text-xs">Ads+Bonus</span>
        </Link>
      </div>
    </>
  );
}

export default HomeSidebar;
