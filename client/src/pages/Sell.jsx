import React from "react";
import { Link } from "react-router-dom";

function Sell() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            Under Construction
          </h1>

          <Link
            to="/home"
            className="bg-cyan-300 p-2 text-gray-900 font-bold rounded-md dark:hover:bg-cyan-400 dark:bg-cyan-500 transition-all hover:bg-cyan-400 duration-300  "
          >
            Let's go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sell;
