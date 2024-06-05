import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";
import OAuth from "../components/OAuth";
import logo from "../assets/xi-biooid.jpg";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false); // Stop the loading here, as the request is complete

      if (data.success === false) {
        // Check for the specific error condition
        if (
          data.message &&
          data.message.includes("E11000 duplicate key error collection")
        ) {
          return setErrorMessage("Username or email already exists.");
        } else {
          return setErrorMessage("Error: " + data.message);
        }
      }

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className=" flex gap-5 flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="sm:text-xl text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100 flex items-center gap-1 sm:gap-3"
          >
            <span className="w-12 h-12 rounded-full overflow-hidden  inline-block">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </span>
            Soft-biooid
          </Link>
          <p className="text-lg mt-5">
            Welcome to Soft-biooid! Sign up now to join our community and
            Explore projects and technologies used. learn about cutting-edge Web
            design, and connect with like-minded individuals. Whether you're a
            junior or senior developer, or simply curious about the future of my
            projects, Soft-biooid is the place for you. Sign up today and embark
            on a journey of discovery!
          </p>
        </div>

        {/* right */}
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="your email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="p-3">loading please wait...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account??</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              <IoMdWarning /> {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
