import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import logo from "../assets/xi-biooid.jpg";
function FooterComp() {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-400 relative z-10  pb-20"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className=" w-full justify-between sm:flex ">
          <div className="">
            <Link
              to="/home"
              className="sm:text-xl text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100 flex items-center   gap-1 sm:gap-3"
            >
              <span className="w-12 h-12 rounded-full overflow-hidden  inline-block">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </span>
              Soft-biooids
            </Link>
            <p className="text-xs text-end hidden sm:block">
              The future is among us
            </p>
          </div>
          <div className="grid  gap-3 sm:mt-4 w-full sm:w-fit grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title
                title="Links"
                className="mt-3 sm:text-lg text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100 "
              />
              <Footer.LinkGroup col>
                <Link
                  to="/home"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Go home
                </Link>
                <Link
                  to="/about"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  About Us
                </Link>
                <Link
                  to="/projects"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Sell Projects
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Follow us"
                className="mt-3 sm:text-lg text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.tiktok.com/@navi_biooids"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tiktok
                </Footer.Link>
                <Footer.Link
                  href="https://www.instagram.com/soft_biooids/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Legal"
                className="mt-3 sm:text-lg text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100"
              />
              <Footer.LinkGroup col>
                <Link to="/privacy" className="hover:underline">
                  privacy policy
                </Link>
                <Link to="/terms" className="hover:underline">
                  Terms & cond
                </Link>
              </Footer.LinkGroup>
            </div>
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
        <div className="w-full sm:flex sm:items-center sm:justify-between mt-5">
          <Footer.Copyright href="#" by="soft-biooids" year={2024} />
        </div>
        <div>version : 1.2.8</div>
      </div>
    </Footer>
  );
}

export default FooterComp;
