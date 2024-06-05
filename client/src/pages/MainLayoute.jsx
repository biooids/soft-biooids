import React from "react";
import FooterComp from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayoute() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <FooterComp />
    </>
  );
}

export default MainLayoute;
