import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
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
import { app } from "../../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { helix } from "ldrs";

helix.register();

export default function UpdateResearch() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuillDisabled, setIsQuillDisabled] = useState(false);
  const [externalLink, setExternalLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { researchId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await fetch(
          `/api/research/getResearches?researchId=${researchId}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        const research = data.researches[0];
        setFormData(research);
        setExternalLink(research.externalLink || "");
      } catch (error) {
        console.log(error.message);
        setPublishError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResearch();
  }, [researchId]);

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
          setIsQuillDisabled(true);
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
          setIsQuillDisabled(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            setIsQuillDisabled(false);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const researchData = {
        ...formData,
        externalLink,
      };
      const res = await fetch(
        `/api/research/updateResearch/${researchId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(researchData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        setIsSubmitting(false);
        return;
      }
      setPublishError(null);
      navigate(`/researches/research/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <l-helix size="100" speed="2.5" color="rgb(0, 255, 255)"></l-helix>
      </div>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update Research
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ""}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ""}
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="agriculture">Agriculture</option>
            <option value="anthropology">Anthropology</option>
            <option value="architecture">Architecture</option>
            <option value="astronomy">Astronomy</option>
            <option value="biology">Biology</option>
            <option value="business">Business</option>
            <option value="chemistry">Chemistry</option>
            <option value="computer_science">Computer Science</option>
            <option value="economics">Economics</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="geology">Geology</option>
            <option value="history">History</option>
            <option value="linguistics">Linguistics</option>
            <option value="literature">Literature</option>
            <option value="marine_biology">Marine Biology</option>
            <option value="materials_science">Materials Science</option>
            <option value="music">Music</option>
            <option value="philosophy">Philosophy</option>
            <option value="physics">Physics</option>
            <option value="political_science">Political Science</option>
            <option value="psychology">Psychology</option>
            <option value="sociology">Sociology</option>
            <option value="space_exploration">Space Exploration</option>
            <option value="statistics">Statistics</option>
            <option value="theater">Theater</option>
            <option value="zoology">Zoology</option>
          </Select>
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
            disabled={imageUploadProgress || isSubmitting}
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
            src={formData.image || ""}
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
          onChange={(value) => setFormData({ ...formData, content: value })}
          readOnly={isQuillDisabled}
        />
        <TextInput
          type="text"
          placeholder="External Link"
          id="externalLink"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
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
            "Update Research"
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
