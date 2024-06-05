import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

import gear from "../assets/mylogo.png";

import "./../image.css";

import { FaHandshake } from "react-icons/fa";

function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="landing-container  min-h-screen  m-auto relative">
      <div className="cover-container block"></div>
      <div className="relative z-10 ">
        <div className="bg-cyan-950  bg-opacity-90 absolute  sm:w-96 p-5 font-Poppins">
          <img src={gear} alt="" className="landing-image" />
          <p className="text-cyan-300">
            I thrive in dynamic environments where I can apply my expertise in
            soft-ware development and creative solutions. By collaborating with
            cross-functional teams, I am eager to contribute to projects that
            drive innovation and growth.
          </p>
        </div>
        <div className="bg-cyan-950  bg-opacity-90 absolute bottom-0 right-0  sm:w-96 p-5 font-Poppins">
          <p className="text-cyan-300">
            Throughout my career choice, I have honed my skills in JavaScript
            and its library React, MongoDB for data bases, node js with express
            as a back end language, I am passionate about backend development
            and continuously seek opportunities to expand my knowledge and skill
            set.
          </p>
          <img src={gear} alt="" className="landing-image" />
        </div>
        <div className="main-content ">
          <Link
            to="/home"
            className=" bg-cyan-300 bg-opacity-80 hover:bg-cyan-500 p-3  transition-all duration-300 text-purple-950 hover:underline font-bold  rounded-md flex  justify-center items-center"
            style={{ textDecoration: "none" }}
          >
            <FaHandshake className="mx-2 text-xl " />
            Door open please enter &rarr;
          </Link>
          {/* <div className=" text-cyan-300 bg-purple-950 dark:bg-opacity-0 dark:text-cyan-300 opacity-80 flex text-5xl  gap-3 justify-center items-center rounded-md p-3">
            <p className="font-Poppins text-lg font-bold "> </p>
            "<SiMongodb />
            <FaReact />
            <SiExpress />
            <IoLogoNodejs />" ;
          </div>

          <div className=" opacity-80  text-cyan-300 dark:bg-opacity-0 dark:text-cyan-300 bg-purple-950 flex text-5xl  gap-3 justify-center items-center rounded-md p-3">
            <p className="font-Poppins text-lg font-bold "> </p>
            "<FaHtml5 />
            <FaCss3Alt />
            <IoLogoJavascript />
            <SiTailwindcss />" ;
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Landing;
