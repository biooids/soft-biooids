import React from "react";
import CallToAction from "../components/CallToAction";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Sell your projects
      </h1>
      <p className="dark:text-cyan-500 text-md text-center ">
        Whether your projects are elegantly simple or intricately complex, this
        is your platform to shine. Share your creations with a community hungry
        for innovation and craftsmanship. From code snippets to every project
        finds its place here. Our user-friendly interface ensures that uploading
        is a breeze, and our dedicated audience is eager to explore and support
        your work. Start your journey today, because here, every project has a
        story, and every creator a stage.
      </p>
      <Link
        to="/sell"
        className="bg-cyan-300 p-2 text-gray-900 font-bold rounded-md dark:hover:bg-cyan-400 dark:bg-cyan-500 transition-all hover:bg-cyan-400 duration-300  "
      >
        Go to my projects-biooid &rarr;
      </Link>
      <CallToAction />
    </div>
  );
}

export default Projects;
