import React from "react";

import {
  IoLogoNodejs,
  IoLogoJavascript,
  IoLogoFirebase,
} from "react-icons/io5";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiMongoose,
  SiNextdotjs,
  SiTypescript,
  SiReactrouter,
  SiSolidity,
  SiSvelte,
  SiWebrtc,
  SiSocketdotio,
} from "react-icons/si";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { TiCloudStorage } from "react-icons/ti";

function TechStack() {
  return (
    <section className="col-span-2  row-span-2  overflow-hidden border-cyan-500 border-b-8 border-t-8  rounded-xl">
      <div className="dark:text-purple-500 p-5 flex flex-col gap-3 justify-between h-full">
        <h3 className="font-semibold text-center">My Tech Stack</h3>

        {/* Frontend Section */}
        <details open className="">
          <summary className="font-semibold cursor-pointer bg-white bg-opacity-5 pl-3 rounded-lg">
            Frontend
          </summary>
          <div className="grid grid-cols-3 gap-4 pt-5 pb-5 ">
            <div className="tech-item">
              <FaHtml5 className="text-orange-600" />
              <span>HTML5</span>
            </div>
            <div className="tech-item">
              <FaCss3Alt className="text-blue-600" />
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <IoLogoJavascript className="text-yellow-500" />
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <FaReact className="text-blue-500" />
              <span>React</span>
            </div>
            <div className="tech-item">
              <SiTailwindcss className="text-blue-400" />
              <span>Tailwind CSS</span>
            </div>
            <div className="tech-item">
              <SiReactrouter className="text-red-600" />
              <span>React Router</span>
            </div>
            <div className="tech-item">
              <SiRedux className="text-purple-600" />
              <span>Redux</span>
            </div>
          </div>
        </details>

        {/* Backend Section */}
        <details>
          <summary className="font-semibold cursor-pointer bg-white bg-opacity-5 pl-3 rounded-lg">
            Backend
          </summary>
          <div className="grid grid-cols-3 gap-4 pt-5 pb-5">
            <div className="tech-item">
              <SiMongodb className="text-green-500" />
              <span>MongoDB</span>
            </div>
            <div className="tech-item">
              <SiExpress className="text-gray-500" />
              <span>Express</span>
            </div>
            <div className="tech-item">
              <IoLogoNodejs className="text-green-500" />
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <SiMongoose className="text-red-600" />
              <span>Mongoose</span>
            </div>
            <div className="tech-item">
              <IoLogoFirebase className="text-yellow-400" />
              <span>Firebase</span>
            </div>

            <div className="tech-item">
              <SiSocketdotio className="text-white" />
              <span>WebSockets</span>
            </div>
          </div>
        </details>

        {/* DevOps/Version Control Section */}
        <details>
          <summary className="font-semibold cursor-pointer bg-white bg-opacity-5 pl-3 rounded-lg">
            DevOps & Version Control
          </summary>
          <div className="grid grid-cols-3 gap-4 pt-5 pb-5">
            <div className="tech-item">
              <FaGitAlt className="text-orange-500" />
              <span>Git</span>
            </div>
            <div className="tech-item">
              <FaGithub className="text-slate-700" />
              <span>GitHub</span>
            </div>
          </div>
        </details>

        {/* Services/Cloud Section */}
        <details>
          <summary className="font-semibold cursor-pointer bg-white bg-opacity-5 pl-3 rounded-lg">
            Services & Cloud
          </summary>
          <div className="grid grid-cols-3 gap-4 pt-5 pb-5">
            <div className="tech-item">
              <TiCloudStorage className="text-blue-500" />
              <span>Cloud Storage</span>
            </div>
            <div className="tech-item">
              <SiWebrtc className="text-amber-600" />
              <span>WebRTC</span>
            </div>
          </div>
        </details>

        {/* Currently Learning Section */}
        <details>
          <summary className="font-semibold cursor-pointer bg-white bg-opacity-5 pl-3 rounded-lg">
            Currently Learning
          </summary>
          <div className="grid grid-cols-3 gap-4 pt-5 pb-5">
            <div className="tech-item">
              <SiNextdotjs className="text-amber-500" />
              <span>Next.js</span>
            </div>
            <div className="tech-item">
              <SiTypescript className="text-blue-500" />
              <span>TypeScript</span>
            </div>
            <div className="tech-item">
              <TbBrandThreejs className="text-slate-700" />
              <span>Three.js</span>
            </div>
            <div className="tech-item">
              <SiSolidity className="text-slate-500" />
              <span>Solidity</span>
            </div>
            <div className="tech-item">
              <SiSvelte className="text-amber-600" />
              <span>Svelte</span>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

export default TechStack;
