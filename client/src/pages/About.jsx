import React from "react";

import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Avatar } from "flowbite-react";

function About() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-2xl m-auto p-3 ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About my blog
          </h1>
          <div className="text-md dark:text-cyan-500 flex flex-col gap-6">
            <p>
              I'm Edouard, a freelance software engineer with a passion for
              creating. I specialize in building full-stack applications and
              crafting diverse websites for clients across industries. My
              expertise lies in React with taiwind, Redux, Node.js, Express.js,
              MongoDB, WebSockets with WebRTC, HTML/CSS, JavaScript etc.
            </p>
            <p>
              From dynamic e-commerce platforms to interactive blogs and
              polished portfolios, I provide bespoke solutions that resonate
              with each client's vision. My goal is to bring ideas to life
              through clean code and user-centric design. Let's collaborate to
              build something exceptional for your online presence.
            </p>
            <div className="flex flex-wrap gap-2">
              <Avatar.Group>
                <Avatar
                  img="https://randomuser.me/api/portraits/men/1.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/women/2.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/men/3.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/women/4.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/men/5.jpg"
                  rounded
                  stacked
                />
              </Avatar.Group>
              <Avatar.Group>
                <Avatar
                  img="https://randomuser.me/api/portraits/women/6.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/men/7.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/women/8.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://randomuser.me/api/portraits/men/9.jpg"
                  rounded
                  stacked
                />
                <Avatar.Counter total={+9} href="#" />
              </Avatar.Group>
            </div>
            <p>Not real people by the way 🙄 🙄 🤷‍♂️🤷‍♂️ </p>
            <p>
              Whether you're envisioning a sleek online store, a captivating
              blog to share your stories, or a professional showcase of your
              work, I'm here to transform your concepts into reality. Get in
              touch today, and let's discuss how we can elevate your digital
              footprint together.
            </p>
          </div>
        </div>
        <div className="flex gap-6 sm:mt-6 mt-4 sm:justify-center items-center ">
          <p>Contact Me :</p>
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
            href="https://www.tiktok.com/@navi__biooid?is_from_webapp=1&sender_device=pc"
            className=" dark:hover:text-cyan-100"
            target="_blank"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/soft_biooid_test"
            className=" dark:hover:text-cyan-100"
            target="_blank"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
