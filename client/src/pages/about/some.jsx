import React, { useState } from "react";

import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import "./about.css";
const About = () => {
  const [side, setSide] = useState("front");

  const handleSideChange = (newSide) => {
    setSide(newSide);
  };

  return (
    <main>
      <div className="menu df fd-c">
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
      <section className="scene">
        <div className={`cube show-${side}`} id="cube" data-side={side}>
          <div className="cube-face cube-face-front">
            <div className="intro-wrapper df fd-r">
              <div className="intro">
                <h1 className="intro-heading">
                  Hi, I'm Lilly, a <span>Frontend</span> Developer
                </h1>
                <p className="intro-text">
                  An economics major turned business journalist who found a
                  passion for coding and web development.
                </p>
                <p className="intro-text">
                  I started out on the software engineering path two years ago
                  with Python but one look at JavaScript was enough to convince
                  me that web development is going to be my zing.
                </p>
              </div>
              <div className="image df fd-r">
                <div className="image-wrapper">
                  <img
                    src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="cube-face cube-face-back">
            <p className="intro-heading">
              Educa<span>tion</span>
            </p>
            <div className="work-edu-section df fd-r">
              <h4 className="work-edu-heading date">2020-2022</h4>
              <div className="work-edu-info">
                <h4 className="work-edu-heading company">Some university</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Ipsam odio repudiandae, enim unde eveniet blanditiis
                    facilis.
                  </li>
                </ul>
              </div>
            </div>
            <div className="work-edu-section df fd-r">
              <h4 className="work-edu-heading date">2016-2020</h4>
              <div className="work-edu-info">
                <h4 className="work-edu-heading company">Some other uni</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Ipsam odio repudiandae, enim unde eveniet blanditiis
                    facilis.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cube-face cube-face-right">
            <p className="intro-heading">
              Wo<span>rk</span>
            </p>
            <div className="work-edu-section df fd-r">
              <h4 className="work-edu-heading date">2020-2022</h4>
              <div className="work-edu-info">
                <h4 className="work-edu-heading company">Some company</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Ipsam odio repudiandae, enim unde eveniet blanditiis
                    facilis.
                  </li>
                </ul>
              </div>
            </div>
            <div className="work-edu-section df fd-r">
              <h4 className="work-edu-heading date">2016-2020</h4>
              <div className="work-edu-info">
                <h4 className="work-edu-heading company">Some other company</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Ipsam odio repudiandae, enim unde eveniet blanditiis
                    facilis.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cube-face cube-face-left">
            <p className="intro-heading">
              Certi<span>fi</span>cates
            </p>
            <div className="certificate-section df fd-r">
              <h4 className="certificate-date">2022</h4>
              <h4 className="certificate-heading">Some certificate #1</h4>
            </div>
            <div className="certificate-section df fd-r">
              <h4 className="certificate-date">2020</h4>
              <h4 className="certificate-heading">Some other certificate #2</h4>
            </div>
            <div className="certificate-section df fd-r">
              <h4 className="certificate-date">2020</h4>
              <h4 className="certificate-heading">Certificate #3</h4>
            </div>
            <div className="certificate-section df fd-r">
              <h4 className="certificate-date">2018</h4>
              <h4 className="certificate-heading">Older certificate #4</h4>
            </div>
            <div className="certificate-section df fd-r">
              <h4 className="certificate-date">2018</h4>
              <h4 className="certificate-heading">Certificate BBB #5</h4>
            </div>
          </div>

          <div className="cube-face cube-face-top">
            <p className="intro-heading">
              <span>Pro</span>jects
            </p>
            <div className="projects">
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#1 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#2 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#3 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#4 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#5 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-border">
                <div className="project-wrapper">
                  <div className="visit-wrapper">
                    <p className="app-title">#6 App</p>
                    <a className="visit-app" href="">
                      Visit app <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cube-face cube-face-bottom">
            <div className="flex gap-6 sm:mb-6 mb-4  items-center ">
              <p>Click to Contact Me :</p>
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
            </div>
            <p className="intro-heading">
              Con<span>tacts</span>
            </p>
            <h4 className="work-edu-heading">
              <i className="fas fa-location-arrow"></i> Sofia, Bulgaria
            </h4>
            <h4 className="work-edu-heading">
              <i className="far fa-envelope"></i> some.persons.email@gmail.com
            </h4>
            <h4 className="work-edu-heading">
              <i className="fas fa-phone"></i> +359 889 111 222
            </h4>
            <div className="social-media-btns">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-github"></i>
              <i className="fab fa-codepen"></i>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
