import React from "react";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 ">
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
            <p>
              Whether you're envisioning a sleek online store, a captivating
              blog to share your stories, or a professional showcase of your
              work, I'm here to transform your concepts into reality. Get in
              touch today, and let's discuss how we can elevate your digital
              footprint together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
