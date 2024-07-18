import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess, updateStart } from "../redux/user/userSlice";
import logo from "../assets/xi-biooid.jpg";

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
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

  const handleSignout = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedSearchTerm = inputSearchTerm.trim().replace(/\s+/g, "+");
    navigate(`/search?searchTerm=${sanitizedSearchTerm}`);
  };

  return (
    <Navbar className="border-b-2 bg-cyan-50  ">
      <Link
        to="/"
        className="sm:text-xl text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100 flex items-center justify-center gap-1 sm:gap-3 "
      >
        <span className="w-12 h-12 rounded-full overflow-hidden  inline-block">
          <img
            src={logo}
            alt="biooids logo"
            className="w-full h-full object-cover"
          />
        </span>
        Soft-biooid
      </Link>

      <form onSubmit={handleSubmit}>
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
      <Link
        to="/search"
        className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
      >
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </Link>

      <div className="flex w-full sm:w-fit gap-2 justify-between md:order-2 mt-3 sm:mt-0">
        <Button
          className="w-12 h-10  sm:inline"
          color="gray"
          pill
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            className="z-50"
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user avatar" img={currentUser.profilePicture} />
            }
          >
            <Dropdown.Header>
              <div className="block text-sm">@{currentUser.username}</div>
              <div className="block text-sm font-medium truncate">
                {currentUser.email}
              </div>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
              <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
            </Link>
            <DropdownDivider />
          </Dropdown>
        ) : (
          <Link to="/sign-up">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign Up
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/home"} as={"div"}>
          <Link to="/home" className="flex justify-center">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="flex justify-center">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className="flex justify-center">
            Sell projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
