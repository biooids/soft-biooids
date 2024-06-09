import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImagefileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImagefileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageFileUploadError("File type should be an image.");
      setImageFile(null);
      setImageFileUrl(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageFileUploadError("Image should be less than 2MB.");
      setImageFile(null);
      setImageFileUrl(null);
      return;
    }

    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (!imageFile || !imageFile.name) {
      return;
    }
    setImagefileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagefileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError();
        setImagefileUploadingProgress(null);
        setImagefileUploading(false);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setTimeout(() => {
            setImagefileUploadingProgress(null);
          }, 3000);

          setFormData({ ...formData, profilePicture: downloadURL });
          setImagefileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("no changes were made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("user updated successfully ");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="file"
          name=""
          id=""
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div className="relative">
          <div
            className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
            onClick={() => {
              filePickerRef.current.click();
            }}
          >
            <FaCamera className="absolute bottom-1   right-12 text-white text-xl" />
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(76, 175, 80, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-10"
              }`}
            />
          </div>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="w-full"
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="w-full"
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="w-full"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading
            ? "Loading..."
            : imageFileUploading
            ? "Uploading Image"
            : "Update Profile"}
        </Button>

        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
            >
              {" "}
              create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5 ">
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className="cursor-pointer hover:underline"
        >
          Delete Account
        </span>

        <span
          onClick={handleSignout}
          className="cursor-pointer hover:underline"
        >
          Sign out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          <div className="flex gap-3 justify-center">
            <span> {updateUserSuccess}</span>
            <IoCheckmarkDoneSharp />
          </div>
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          <div className="flex gap-3 text-center">
            <span> {updateUserError}</span>

            <BiSolidError />
          </div>
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          <div className="flex gap-3 text-center">
            <span> {error}</span>

            <BiSolidError />
          </div>
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <CgDanger className="h-14 w-14 text-gray-950 mb-4 mx-auto" />
            <h3 className="mb-5 text-xl font-bold">
              are you sure you want to delete this account bro ??
            </h3>
            <h3 className="mb-2 text-sm font-bold ">please don't go</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes am sure lol
              </Button>
              <Button color="success" onClick={() => setShowModal(false)}>
                No let's be together
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProfile;
