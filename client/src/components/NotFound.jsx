import React from "react";
import imageNotFound from "../assets/404.jpg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center text-center ">
      <div className="p-5 gap-3 flex flex-col">
        <h1 className="text-9xl">404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/home" className="underline">
          Return Home dear
        </Link>
        <div>
          <img
            src={imageNotFound}
            alt="404 image"
            className="w-full h-full rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
