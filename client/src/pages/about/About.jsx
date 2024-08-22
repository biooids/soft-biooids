import React, { useState } from "react";

import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import "./about.css";
import { Avatar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const About = () => {
  const [side, setSide] = useState("front");

  const handleSideChange = (newSide) => {
    setSide(newSide);
  };

  return (
    <>
      <section className="about-section hidden md:flex  justify-center  items-center relative   ">
        <div className="menu gap-3 p-3  flex flex-col  sticky top-0 z-10">
          <button
            className="btn"
            data-side="front"
            onClick={() => handleSideChange("front")}
          >
            Intro
          </button>
          <button
            className="btn"
            data-side="right"
            onClick={() => handleSideChange("right")}
          >
            Work
          </button>
          <button
            className="btn"
            data-side="back"
            onClick={() => handleSideChange("back")}
          >
            Education
          </button>
          <button
            className="btn"
            data-side="left"
            onClick={() => handleSideChange("left")}
          >
            Certificates
          </button>
          <button
            className="btn"
            data-side="top"
            onClick={() => handleSideChange("top")}
          >
            Projects
          </button>
          <button
            className="btn"
            data-side="bottom"
            onClick={() => handleSideChange("bottom")}
          >
            Contacts
          </button>
        </div>
        <section className="scene ">
          <div className={`cube show-${side}`} id="cube" data-side={side}>
            <div className="cube-face cube-face-front">
              <div className="intro-wrapper df fd-r">
                <div className="intro">
                  <h1 className="intro-heading text-xl">
                    Hi, I'm <span>Hwapyong M. Edouard</span>, a{" "}
                    <span>Full Stack</span> Developer
                  </h1>
                  <p className="intro-text">
                    Studied <span>Sciences</span> in high school including
                    Physics , Chemistry, Biology, Math, as my main majors. I
                    loved biology by the way
                  </p>
                  <p className="intro-text">
                    Well, things just change, I started to teach my self{" "}
                    <span>software engineering (coding and programming) </span>
                    after graduation, but one look at JavaScript was enough to
                    convince me that web development is going to help me to
                    start my career path.
                  </p>
                  <p className="intro-text">
                    I have been working on it ever since using frame works and
                    stuff.
                  </p>
                </div>
                <div className="image df fd-r">
                  <div className="image-wrapper">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/soft-biooid.appspot.com/o/xi-biooid.jpg?alt=media&token=cc88392f-090c-4361-a8a5-d5dab8d7d846"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="cube-face cube-face-back">
              <p className="intro-heading text-xl">
                Educa<span>tion</span>
              </p>
              <div className="work-edu-section df fd-r">
                <h4 className="work-edu-heading date">2023-Now</h4>
                <div className="work-edu-info">
                  <h4 className="work-edu-heading company">
                    Self-teaching Programming
                  </h4>
                  <ul>
                    <li>
                      I teach my self programming using related platforms, like
                      <span className="text-blue-500">
                        {" "}
                        EDX, COURSERA, YOUTUBE, etc...
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="work-edu-section df fd-r">
                <h4 className="work-edu-heading date">2020-2023</h4>
                <div className="work-edu-info">
                  <h4 className="work-edu-heading company">
                    High School A. Level
                  </h4>
                  <ul>
                    <li>
                      "$ Name :{" "}
                      <span className="text-blue-500">
                        Byimana School of Sciences"
                      </span>
                      <li>
                        "$ Majors :{" "}
                        <span className="text-blue-500">
                          Physics , Chemistry, Biology, Math
                        </span>
                        "
                      </li>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="work-edu-section df fd-r">
                <h4 className="work-edu-heading date">2017-2019</h4>
                <div className="work-edu-info">
                  <h4 className="work-edu-heading company">
                    High School O. Level
                  </h4>
                  <ul>
                    <li>
                      "$ Name :{" "}
                      <span className="text-blue-500">
                        Byimana School of Sciences"
                      </span>
                      <li>
                        "$ Courses :{" "}
                        <span className="text-blue-500">
                          Physics , Chemistry, Biology, Math, and many more.
                        </span>
                        "
                      </li>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cube-face cube-face-right">
              <p className="intro-heading text-xl">
                Wo<span>rk</span>
              </p>
              <div className="work-edu-section df fd-r">
                <h4 className="work-edu-heading date">2023-Now</h4>
                <div className="work-edu-info">
                  <h4 className="work-edu-heading company">My Start up</h4>
                  <ul className="flex flex-col gap-3">
                    <li className="flex  ">
                      <p className="flex-1">
                        {" "}
                        I founded biooids, a tech-oriented software engineering
                        and biology company
                      </p>
                      <Avatar
                        img="https://firebasestorage.googleapis.com/v0/b/soft-biooid.appspot.com/o/xi-biooid.jpg?alt=media&token=cc88392f-090c-4361-a8a5-d5dab8d7d846"
                        size="lg"
                        rounded
                        bordered
                        color="purple"
                      />
                    </li>
                    <li>It's just a hope and my dream</li>
                  </ul>
                </div>
              </div>
              <div className="work-edu-section df fd-r">
                <h4 className="work-edu-heading date">Now-Now</h4>
                <div className="work-edu-info">
                  <h4 className="work-edu-heading company">
                    Some other company
                  </h4>
                  <ul className="flex flex-col gap-3">
                    <li>
                      I'm currently freelancing while looking for opportunities
                      to join a company.🤷‍♂️ why not!
                    </li>
                    <li>
                      If you want me to build some thing for you , I charge
                      less, for surviving.{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cube-face cube-face-left">
              <p className="intro-heading text-xl">
                Certi<span>fi</span>cates
              </p>
              <div className="certificate-section df fd-r">
                <h4 className="certificate-date">2023 </h4>
                <h4 className="certificate-heading"> High school diploma.</h4>
              </div>
              <div className="certificate-section df fd-r">
                <h4 className="certificate-date">2022</h4>
                <h4 className="certificate-heading">
                  Byimana Science Club Honor
                </h4>
              </div>
              <div className="certificate-section df fd-r">
                <h4 className="certificate-date">2019</h4>
                <h4 className="certificate-heading">
                  Ordinary Level Certificate
                </h4>
              </div>
            </div>

            <div className="cube-face cube-face-top">
              <p className="intro-heading text-xl">
                <span>Pro</span>jects
              </p>
              <Link
                to="/search"
                className="p-2 border-2 border-cyan-500 hover:bg-slate-800 rounded-lg"
              >
                My projects
              </Link>
            </div>

            <div className="cube-face cube-face-bottom  ">
              <p className="intro-heading text-xl">
                Con<span>tacts</span>
              </p>
              <div className="flex flex-col gap-3 items-start">
                <h4 className="work-edu-heading flex justify-center items-center gap-2">
                  <FaUser />
                  Hwapyong M. Edouard
                </h4>
                <h4 className="work-edu-heading flex justify-center items-center gap-2">
                  <MdEmail />
                  ehwapyongm@gmail.com
                </h4>
                <h4 className="work-edu-heading flex justify-center items-center gap-2">
                  <FaPhoneAlt />
                  +250 790 931 024
                </h4>
                <h4 className="work-edu-heading flex justify-between items-center w-full gap-2">
                  Click :
                  <a
                    href="mailto:ehwapyongm@gmail.com"
                    className=" dark:hover:text-cyan-100"
                    target="_blank"
                  >
                    <MdEmail />
                  </a>
                  <a
                    href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
                    className=" dark:hover:text-cyan-100"
                    target="_blank"
                  >
                    <IoLogoWhatsapp />
                  </a>
                  <a
                    href="https://www.tiktok.com/@navi_biooids"
                    className=" dark:hover:text-cyan-100"
                    target="_blank"
                  >
                    <FaTiktok />
                  </a>
                  <a
                    href="https://www.instagram.com/soft_biooids/"
                    className=" dark:hover:text-cyan-100"
                    target="_blank"
                  >
                    <AiFillInstagram />
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="mobile-version md:hidden px-4 py-6 space-y-8">
        <div>
          <h2 className="intro-heading text-2xl font-bold mb-2">
            Introduction
          </h2>
          <p className="content text-base">
            Hi, I'm Hwapyong M. Edouard, a Full Stack Developer Studied Sciences
            in high school including Physics , Chemistry, Biology, Math, as my
            main majors. I loved biology by the way Well, things just change, I
            started to teach my self software engineering (coding and
            programming) after graduation, but one look at JavaScript was enough
            to convince me that web development is going to help me to start my
            career path. I have been working on it ever since using frame works
            and stuff.
          </p>
        </div>
        <div>
          <h2 className="intro-heading text-2xl font-bold mb-2">Work</h2>
          <p className="content text-base">
            I'm currently freelancing while looking for opportunities to join a
            company.🤷‍♂️ why not! If you want me to build some thing for you , I
            charge less, for surviving. I'm open to any kind of project, so feel
            free to reach out if you have a project in mind.
          </p>
        </div>
        <div>
          <h2 className="intro-heading text-2xl font-bold mb-2">Education</h2>
          <p className="content text-base">
            I graduated from Byimana School of Sciences, where I majored in
            Physics, Chemistry, Biology, and Math. Currently, I'm self-teaching
            programming through platforms like EDX and Coursera.
          </p>
        </div>
        <div>
          <h2 className="intro-heading text-2xl font-bold mb-2">
            Certificates
          </h2>
          <p className="content text-base">
            I have a High School Diploma, Byimana Science Club Honor, and an
            Ordinary Level Certificate.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="intro-heading text-2xl font-bold mb-2">Projects</h2>
          <p className="content text-base ">
            Explore my projects where I create some innovative solutions.
          </p>
          <Link to="/search" className="text-cyan-500">
            <Button>View Projects</Button>
          </Link>
        </div>
        <div>
          <h2 className="intro-heading text-2xl font-bold mb-2">Contacts</h2>
          <div className="content space-y-2">
            <p className="flex items-center gap-2">
              <FaUser />
              Hwapyong M. Edouard
            </p>
            <p className="flex items-center gap-2">
              <MdEmail />
              ehwapyongm@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt />
              +250 790 931 024
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:ehwapyongm@gmail.com"
                className="dark:hover:text-cyan-100"
                target="_blank"
              >
                <MdEmail />
              </a>
              <a
                href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
                className="dark:hover:text-cyan-100"
                target="_blank"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="https://www.tiktok.com/@navi_biooids"
                className="dark:hover:text-cyan-100"
                target="_blank"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.instagram.com/soft_biooids/"
                className="dark:hover:text-cyan-100"
                target="_blank"
              >
                <AiFillInstagram />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
