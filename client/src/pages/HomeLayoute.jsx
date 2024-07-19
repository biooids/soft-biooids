import React from "react";
import HomeSidebar from "./HomeSidebar";
import { Outlet } from "react-router-dom";

function HomeLayoute() {
  return (
    <div className="flex">
      <nav className="w-0 md:w-[16%] md:p-3  border-r-2 border-slate-700">
        <HomeSidebar />
      </nav>

      <section className=" w-full md:w-[84%]">
        <Outlet />
      </section>
    </div>
  );
}

export default HomeLayoute;
