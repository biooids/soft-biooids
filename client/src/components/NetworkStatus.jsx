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

  useEffect(() => {
    const handleOnline = () => {
      dispatch(setOnline());
      setShowOnlineMessage(true);
      setTimeout(() => setShowOnlineMessage(false), 3000); // Show "Back Online" message for 3 seconds
    };

    const handleOffline = () => {
      dispatch(setOffline());
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
        <Alert color="failure" className="fixed top-0 left-0 right-0 z-50">
          <IoMdWarning /> You are currently offline. Some features may not be
          available.
        </Alert>
      )}
      {isOnline && showOnlineMessage && (
        <Alert color="success" className="fixed top-0 left-0 right-0 z-50">
          <IoMdWarning /> You are back online.
        </Alert>
      )}
    </>
  );
};

export default NetworkStatus;
