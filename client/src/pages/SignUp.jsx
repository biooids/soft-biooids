import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";
import OAuth from "../components/OAuth";
import logo from "../assets/xi-biooid.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice";

function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      dispatch(signUpFailure("Please fill out all fields"));
      return;
    }

    try {
      dispatch(signUpStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        if (
          data.message &&
          data.message.includes("E11000 duplicate key error collection")
        ) {
          dispatch(signUpFailure("Username or email already exists."));
        } else {
          dispatch(signUpFailure("Error: " + data.message));
        }
        return;
      }

      if (res.ok) {
        dispatch(signUpSuccess(data));
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center">
        <div className="flex-1">
          <Link
            to="/"
            className="sm:text-xl text-sm self-center whitespace-nowrap font-semibold dark:text-cyan-100 flex items-center gap-1 sm:gap-3"
          >
            <span className="w-12 h-12 rounded-full overflow-hidden inline-block">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </span>
            Soft-biooid
          </Link>
          <p className="text-lg mt-5">
            Welcome to Soft-biooid! Sign up now to join our community and
            explore projects and technologies used. Learn about cutting-edge web
            design, and connect with like-minded individuals. Whether you're a
            junior or senior developer, or simply curious about the future of my
            projects, Soft-biooid is the place for you. Sign up today and embark
            on a journey of discovery!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
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
                  <span className="p-3">Loading, please wait...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
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
