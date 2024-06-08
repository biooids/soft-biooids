import React from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-2xl m-auto p-3 ">
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
        <div className="dark:text-cyan-500">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email2"
                  value="Your email"
                  className="dark:text-cyan-500"
                />
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@flowbite.com"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="firstName"
                  value="Your First Name"
                  className="dark:text-cyan-500"
                />
              </div>
              <TextInput id="firstName" type="text" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="lastName"
                  value="Your Last Name"
                  className="dark:text-cyan-500"
                />
              </div>
              <TextInput id="lastName" type="text" required shadow />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" required />
              <Label htmlFor="agree" className="flex dark:text-cyan-500">
                I agree with the&nbsp;
                <Link
                  to="/terms"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="comment"
                  value="Your message"
                  className="dark:text-cyan-500"
                />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <Button type="submit">Contact me</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;
