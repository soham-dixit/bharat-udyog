import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";
import UserContext from "../context/User/UserContext";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import axios from "../axios/axios";
import categoriesData from "../utils/categories.json";

const colorOptions = ["Red", "Blue"];

const sizeOptions = ["Small", "Medium", "Large"];

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddProduct = () => {
  const history = useHistory();
  const { state } = useContext(UserContext);
  const initialState = {
    productName: "",
    price: "",
    description: "",
    availableQty: "",
    category: "",
    weight: "",
    exporterId: state.user.id,
    photoUrl: "",
  };
  const [details, setDetails] = useState(initialState);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  // const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

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
          setIsUploaded(true);
          setIsUploading(true);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/exporter/addProduct", details)
      .then((res) => {
        toast.success(res.data.message, "Please wait for approval");
        setDetails(initialState);
        // history.push(`/login`);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    // setUploading(false);
    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("file", files[i]);
    // }

    // for (const key in details) {
    //   formData.append(key, details[key]);
    // }

    // fetch("http://localhost:8000/api/v4/exporter/addProduct", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((data) => data.json())
    //   .then((res) => {
    //     toast.success(res.message);

    //     setDetails(initialState);
    //     // history.push(`/login`);
    //   })
    //   .catch((error) => {
    //     toast.error(`${error} Failed!!`);

    //     setDetails(initialState);
    //   });
  };

  return (
    <div>
      <PageTitle>Add New Product</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-color">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" color="red-600" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Product</p>
      </div>
      <form
        action="post"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3">
          <Card className="row-span-2 md:col-span-2">
            <CardBody>
              <FormTitle>Product Image</FormTitle>
              <input
                type="file"
                className="mb-4 
                requiredtext-gray-800 dark:text-gray-300"
                name="file"
                // onChange={(e) => setFiles(e.target.files)}
                onChange={uploadImage}
                multiple
                disabled={isUploaded}
              // ref={fileInputRef}
              />

              <FormTitle>Product Name</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  required
                  placeholder="Type product name here"
                  name="productName"
                  value={details.productName}
                  onChange={onChangeHandler}
                />
              </Label>

              <FormTitle>Product Price</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  required
                  placeholder="Enter product price here"
                  name="price"
                  value={details.price}
                  onChange={onChangeHandler}
                />
              </Label>

              <FormTitle>Full description</FormTitle>
              <Label>
                <Textarea
                  className="mb-4"
                  required
                  rows="5"
                  placeholder="Enter product full description here"
                  name="description"
                  value={details.description}
                  onChange={onChangeHandler}
                />
              </Label>

              <FormTitle>Weight</FormTitle>
              <Input
                className="mb-4"
                required
                placeholder="Enter product weight here"
                name="weight"
                value={details.weight}
                onChange={onChangeHandler}
              />
              <Label></Label>

              <div className="w-full">
                <Button
                  type="submit"
                  className="bg-color"
                  size="large"
                  iconLeft={AddIcon}
                // disabled={isUploading}
                >
                  Add Product
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className="h-100 ">
            <CardBody>
              <div className="flex mb-8 ">
                <Button
                  layout="primary"
                  className="mr-3"
                  iconLeft={PublishIcon}
                // disabled={isUploading}
                >
                  Add Product
                </Button>
                <Button layout="link" iconLeft={StoreIcon}>
                  Save as Draft
                </Button>
              </div>
              <div>
                <Label className="mt-4">
                  <FormTitle>Select Product Category</FormTitle>
                  <Select
                    className="mt-1"
                    name="category"
                    value={details.category}
                    onChange={onChangeHandler}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categoriesData.categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </Label>
              </div>
              <div className="mt-4">
                <FormTitle className="mt-8">Stock Quantity</FormTitle>
                <Label>
                  <Input
                    className="mb-4"
                    placeholder="Enter product stock quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={details.availableQty}
                    onChange={onChangeHandler}
                    name="availableQty"
                  />
                </Label>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;