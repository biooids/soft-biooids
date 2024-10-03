import React from "react";
import AdCard from "./AdCard";

function Ads() {
  return (
    <section className="min-h-screen ads-section grid gap-4 p-4">
      <AdCard />
      <AdCard />
      <AdCard />
    </section>
  );
}

export default Ads;
