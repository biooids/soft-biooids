import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import logo from "../assets/xi-biooid.jpg";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.email) {
      dispatch(signInFailure("Please fill out all the fields"));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
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
          dispatch(signInFailure("Username or email already exists."));
        } else {
          dispatch(signInFailure("Error: " + data.message));
        }
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center">
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
            Welcome back to Soft-biooid! Sign in now to access your account and
            explore the latest articles, discussions, and updates. Dive into a
            world of technology, innovation, and creativity. Whether you're here
            to share your insights or to stay informed, Soft-biooid has
            everything you need. Sign in today and join our vibrant community!
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account??</span>
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
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

export default SignIn;
