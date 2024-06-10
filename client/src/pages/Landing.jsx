import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

import gear from "../assets/mylogo.png";

import "./../image.css";

import { FaHandshake } from "react-icons/fa";

import { helix } from "ldrs";

helix.register();

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
        <l-helix size="100" speed="2.5" color="rgb(0, 255, 255)"></l-helix>
      </div>
    );
  }

  return (
    <div className="landing-container min-h-screen m-auto relative">
      <div className="cover-container block"></div>
      <div className="relative z-10 ">
        <div className="bg-cyan-950 bg-opacity-90 absolute sm:w-96 p-5 font-Poppins">
          <img src={gear} alt="" className="landing-image" />
          <p className="text-cyan-300">
            I thrive in dynamic environments where I can apply my expertise in
            soft-ware development and creative solutions. By collaborating with
            cross-functional teams, I am eager to contribute to projects that
            drive innovation and growth.
          </p>
        </div>
        <div className="bg-cyan-950 bg-opacity-90 absolute bottom-0 right-0 sm:w-96 p-5 font-Poppins">
          <p className="text-cyan-300">
            Throughout my career choice, I have honed my skills in JavaScript
            and its library React, MongoDB for data bases, node js with express
            as a back end language, I am passionate about backend development
            and continuously seek opportunities to expand my knowledge and skill
            set.
          </p>
          <img src={gear} alt="" className="landing-image" />
        </div>
        <div className="main-content text-center ">
          <TypeAnimation
            className=""
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Hello Human 👋 !",
              1000,
              "This is soft-biooids official web site ",
              1000,
              "Click the button below to enter",
              1000,
            ]}
            speed={60}
            style={{ fontSize: "1.5rem" }}
            repeat={Infinity}
          />
          {/* <h2 className="text-cyan-300  font-Poppins">Hello Human !</h2> */}
          <Link
            to="/home"
            className="bg-cyan-300 bg-opacity-80 hover:bg-cyan-500 p-3 transition-all duration-300 text-purple-950 hover:underline font-bold rounded-md flex justify-center items-center"
            style={{ textDecoration: "none" }}
          >
            <FaHandshake className="mx-2 text-xl " />
            Door open please enter &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
