import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        dispatch(signInFailure("Internet connection lost. Please try again."));
      } else {
        dispatch(signInFailure(error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="m-2 text-amber-500 text-center">
        Or continue with google if applicable
      </p>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span className="p-3">Waiting...</span>
          </>
        ) : (
          <>
            <FaGoogle className="w-6 h-6 text-red-700 mr-2" />
            Continue with Google
          </>
        )}
      </Button>
    </>
  );
}

export default OAuth;
