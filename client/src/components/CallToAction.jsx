import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function CallToAction() {
  return (
    <div className="flex-col flex sm:flex-row p-3 border border-cyan-600 justify-center items-center rounded-3xl text-center dark:text-cyan-300  gap-3">
      <div className="flex flex-col justify-center items-center gap-2   ">
        <h2 className="font-bold text-sm md:text-2xl">
          All big tech companies started as a group of small commited legends
          who loved Silicon Symphony "programming"
        </h2>
        <p>I am interested to make a successful team</p>
        <div className="flex gap-3 text-2xl">
          <a
            href="mailto:ehwapyongm@gmail.com"
            className=" dark:hover:text-cyan-100"
          >
            <MdEmail />
          </a>
          <a
            target="_blank"
            href="https://wa.me/+250790931024?text=Hello,%20I'm%20interested%20in%20your%20work"
            className=" dark:hover:text-cyan-100"
          >
            <IoLogoWhatsapp />
          </a>
          <a
            target="_blank"
            href="https://www.tiktok.com/@navi__biooid?is_from_webapp=1&sender_device=pc"
            className=" dark:hover:text-cyan-100"
          >
            <FaTiktok />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/soft_biooid_test"
            className=" dark:hover:text-cyan-100"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
      <div className="p-7"></div>
    </div>
  );
}

export default CallToAction;
