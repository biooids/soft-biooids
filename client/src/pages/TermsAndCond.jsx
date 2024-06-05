import React from "react";

function TermsAndCond() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            Terms and Conditions
          </h1>
          <div className="text-md dark:text-cyan-300 flex flex-col gap-6">
            <p>
              Welcome to our website. By accessing and using this website, you
              agree to comply with the following terms and conditions. Please
              read these carefully before proceeding.
            </p>
            <p>
              The content of this website is for general information purposes
              only. We reserve the right to modify, update, or remove any
              content without prior notice.
            </p>
            <p>
              Users are responsible for their own actions while using this
              website. Any misuse, unauthorized access, or violation of these
              terms may result in termination of access.
            </p>
            <p>
              We make every effort to ensure the accuracy and reliability of the
              information presented on this website, but we cannot guarantee its
              completeness or timeliness.
            </p>
            <p>
              By using this website, you acknowledge that you have read and
              understood these terms and conditions. If you have any questions
              or concerns, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCond;
