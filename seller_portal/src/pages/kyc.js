import React, { useContext, useEffect, useState } from "react";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import toast from "react-hot-toast";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";
import axios from "../axios/axios";

function KYC() {
  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    const reloadFlag = sessionStorage.getItem("reloaded");

    if (!reloadFlag) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  // State variables
  const history = useHistory();
  const { exporterId } = useParams();
  const [documents, setDocuments] = useState([]); // State for storing documents
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const initialState = {
    documentName: "",
    documentNumber: "",
    documentIssuedBy: "",
    dateOfIssue: "",
    photoUrl: "",
    exporterId: exporterId,
  };
  const [details, setDetails] = useState(initialState);

  const uploadImage = (e) => {
    e.preventDefault();
    setIsUploading(true);
    toast.loading("Uploading your image please wait!");
    const file = e.target?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImgUrl(downloadURL);
          toast.remove();
          toast.success(
            "Your file has been uploaded, Please fill other details!!"
          );
          setIsUploading(false);
        } catch (error) {
          console.error(error);
          toast.error("Error while getting download URL");
        }
      }
    );
  };

  useEffect(() => {
    if (imgUrl !== null) {
      setDetails((prevDetails) => ({ ...prevDetails, photoUrl: imgUrl }));
    }
  }, [imgUrl]);

  // useEffect(() => {
  //   console.log(imgUrl);
  // }, [imgUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/exporter/uploadKycDetails", details)
      .then((res) => {
        toast.success(res.data.message, "Please wait for approval");
        setDetails(initialState);
        history.push(`/login`);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    // const formData = new FormData();

    // for (let i = 0; i < documents.length; i++) {
    //   formData.append("file", documents[i]);
    // }

    // for (const key in details) {
    //   formData.append(key, details[key]);
    // }
    // fetch("http://localhost:8000/api/v4/exporter/uploadKycDetails", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((data) => data.json())
    //   .then((res) => {
    //     toast.success(res.message, "Please wait for approval");

    //     setDetails(initialState);
    //     history.push(`/login`);
    //   })
    //   .catch((error) => {
    //     toast.error(`${error} Failed!!`);

    //     setDetails(initialState);
    //   });
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // const handleImagePreview = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size <= 500 * 1024) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImagePreview(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       alert("Image size should be below 500 KB.");
  //     }
  //   }
  // };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4 bg-white ">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-5000">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  KYC form
                </h2>
                <form
                  action="post"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  disabled={isUploading}
                >
                  {/* Dropdown box */}
                  <Label className="mt-6 text-lg">
                    <span>Select KYC Document</span>
                    <Select
                      className="mt-2"
                      value={details.documentName}
                      // onChange={handleChange}
                      onChange={handleChange}
                      name="documentName"
                    >
                      <option>--SELECT--</option>
                      <option value="IEC">IEC</option>
                      <option value="AD Code">AD Code</option>
                      <option value="GSTIN">GSTIN</option>
                      <option value="LUT/Bond">LUT/Bond</option>
                      <option value="Other">Other</option>
                    </Select>
                  </Label>

                  {/* Document Number */}
                  <Label className="mt-6 text-lg">
                    <span>Document Number</span>
                    <Input
                      required
                      className="mt-2"
                      type="text"
                      value={details.documentNumber}
                      onChange={handleChange}
                      name="documentNumber"
                    />
                  </Label>

                  {/* Authority Issued By */}
                  <Label className="mt-6 text-lg">
                    <span>Document Issued by</span>
                    <Input
                      required
                      className="mt-2"
                      value={details.documentIssuedBy}
                      onChange={handleChange}
                      name="documentIssuedBy"
                    />
                  </Label>

                  {/* Date Selection */}
                  <Label className="mt-6 text-lg">
                    <span>Date of Issue</span>
                    <Input
                      required
                      className="mt-2"
                      type="date"
                      value={details.dateOfIssue}
                      onChange={handleChange}
                      name="dateOfIssue"
                    />
                  </Label>

                  {/* Image Selection */}
                  <Label className="mt-6 text-lg">
                    <span>Select Document</span>
                    <Input
                      required
                      className="mt-2"
                      type="file"
                      accept="image/*"
                      // onChange={(e) => setDocuments(e.target.files)}
                      onChange={uploadImage}
                    />
                    <p className="text-sm text-color">
                      Size should be below 500 kb
                    </p>
                  </Label>

                  <Button
                    className="mt-6 text-2xl bg-color text-white font-Poppins"
                    block
                    type="submit"
                    disabled={isUploading}
                  >
                    Save
                  </Button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KYC;
