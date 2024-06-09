import React, { useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Checkbox,
  Spinner,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [publishError, setPublishError] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuillDisabled, setIsQuillDisabled] = useState(false); // State for Quill disable
  const [externalLink, setExternalLink] = useState(""); // State for external link
  const [isMainPost, setIsMainPost] = useState(false); // State for main post checkbox
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
          setIsQuillDisabled(true); // Disable Quill while uploading
        },
        (error) => {
          console.error("Upload error:", error.message);
          setImageUploadError("Uploading the image failed: " + error.message);
          setImageUploadProgress(null);
          setIsQuillDisabled(false); // Enable Quill on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            setIsQuillDisabled(false); // Enable Quill after successful upload
          });
        }
      );
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      setIsQuillDisabled(false); // Enable Quill on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true); // Set the state to indicate submitting
      const postData = {
        ...formData,
        externalLink, // Include external link in the post data
        mainPost: isMainPost, // Include main post checkbox value in the post data
      };
      console.log("Post Data with External Link:", postData); // Add this line
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        setIsSubmitting(false); // Reset the state on failure
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong: " + error.message);
    } finally {
      setIsSubmitting(false); // Reset the state after the operation is complete
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ""}
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="html">HTML and CSS</option>
            <option value="javascript">Javascript, HTML and CSS</option>
            <option value="reactjs">React js and Tailwind</option>
            <option value="threejs">Three js</option>
            <option value="typscript">TypeScript</option>
            <option value="mongo">Mongo db</option>
            <option value="node">Node and Express</option>
            <option value="mern">MERN Stack</option>
            <option value="nextjs">MERN and NEXT js</option>
            <option value="videoapp">WebSockets and WebRTC</option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="mainPost"
            checked={isMainPost}
            onChange={(e) => {
              setIsMainPost(e.target.checked);
              setFormData({ ...formData, mainPost: e.target.checked });
            }}
          />
          <label htmlFor="mainPost">Main Post</label>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress || isSubmitting} // Disable when uploading or submitting
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          readOnly={isQuillDisabled} // Disable Quill editor when isQuillDisabled is true
        />
        <TextInput
          type="text"
          placeholder="External Link"
          id="externalLink"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          className="flex-1"
        />
        <Button
          className="text-cyan-100"
          type="submit"
          gradientDuoTone="purpleToPink"
          disabled={imageUploadProgress || isSubmitting}
        >
          {imageUploadProgress ? (
            "Uploading Image, and the text area is disable..."
          ) : isSubmitting ? (
            <div className="flex items-center">
              <Spinner size="lg" /> Submitting
            </div>
          ) : (
            "Publish"
          )}
        </Button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
