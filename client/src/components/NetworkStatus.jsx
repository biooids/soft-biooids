// NetworkStatus.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnline, setOffline } from "../redux/network/networkSlice";
import { Alert } from "flowbite-react";
import { IoMdWarning } from "react-icons/io";

const NetworkStatus = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.network.isOnline);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [speed, setSpeed] = useState(null);

  const measureSpeed = async () => {
    const imageUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"; // Replace with a small file on your server
    const startTime = new Date().getTime();

    try {
      const response = await fetch(imageUrl, { cache: "no-cache" });
      if (response.ok) {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const sizeInBits = response.headers.get("content-length") * 8;
        const speedInMbps = (sizeInBits / duration / (1024 * 1024)).toFixed(2);
        setSpeed(speedInMbps);
      }
    } catch (error) {
      console.error("Error measuring speed:", error);
    }
  };

  useEffect(() => {
    const updateOnlineStatus = async () => {
      if (navigator.onLine) {
        dispatch(setOnline());
        setShowOnlineMessage(true);
        await measureSpeed();
        setTimeout(() => setShowOnlineMessage(false), 3000); // Show "Back Online" message for 3 seconds
      } else {
        dispatch(setOffline());
      }
    };

    updateOnlineStatus(); // Check status immediately when component mounts

    const handleOnline = async () => {
      dispatch(setOnline());
      setShowOnlineMessage(true);
      await measureSpeed();
      setTimeout(() => setShowOnlineMessage(false), 3000); // Show "Back Online" message for 3 seconds
    };

    const handleOffline = () => {
      dispatch(setOffline());
      setSpeed(null);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  return (
    <>
      {!isOnline && (
        <Alert
          color="failure"
          className="fixed top-0 left-0 right-0 z-50 flex w-[30%] mx-auto"
        >
          <IoMdWarning /> You are currently offline. Some features may not be
          available. Turn Off and On the internet connection source. Internet
          speed: {speed ? `${speed} Mbps` : "0.0Mbps"}
        </Alert>
      )}
      {isOnline && showOnlineMessage && (
        <Alert
          color="success"
          className="fixed top-0 left-0 right-0 z-50 w-[30%] mx-auto"
        >
          <IoMdWarning /> You are back online. Internet speed:{" "}
          {speed ? `${speed} Mbps` : "0.0Mbps"}
        </Alert>
      )}
    </>
  );
};

export default NetworkStatus;
