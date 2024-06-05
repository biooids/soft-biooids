import React from "react";

function Privacy() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            Privacy Policy
          </h1>
          <div className="text-md dark:text-cyan-300 flex flex-col gap-6">
            <p>
              Your privacy is important to us. This Privacy Policy outlines how
              we collect, use, and protect your personal information when you
              visit our website.
            </p>
            <p>
              We may collect information such as your name, email address, and
              for the purpose of improving your browsing experience and
              providing relevant content. Rest assured that we do not sell or
              share your information with third parties without your consent.
            </p>
            <p>
              By using this website, you agree to the terms outlined in this
              Privacy Policy. We may update this policy from time to time, so we
              encourage you to review it periodically.
            </p>
            <p>
              If you have any questions or concerns about our Privacy Policy,
              please don't hesitate to contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
