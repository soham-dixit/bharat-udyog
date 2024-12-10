import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Grid,
  Tabs,
  TabPane,
  TabNav,
  TabNavItem,
  TabContent,
  TabContext,
  TabPanel,
  Tab,
  TabList,
  Box,
  Media,
} from "@windmill/react-ui";
import response from "../utils/demo/profileData";
import { useState } from "react";
import Icon from "../components/Icon";

const Profile = () => {
  const {
    avatar,
    expname,
    firstName,
    lastName,
    email,
    phone,
    Address,
    city,
    pincode,
  } = response;

  const avatarStyle = {
    width: "220px",
    height: "220px",
  };

  const [editedProduct, setEditedProduct] = useState(response);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // You can handle the file upload logic here
    // For simplicity, let's just update the photo URL for demonstration
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <PageTitle>Manage your Profile</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-red-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" color="red-600" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Profile</p>
      </div>

      <div className=" mb-8 mt-6 flex gap-3  ">
        <Card className="shadow-md w-full h-full">
          <CardBody>
            {/* Content for the first card */}
            <div>
              <Tab></Tab>
              <div className="mt-2 text-center mb-7">
                <p className="text-lg text-gray-700 font-semibold mb-1">
                  {expname}
                </p>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm text-gray-600">{city}, India</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-md w-2/3 h-full">
          <CardBody>
            {/* Content for the second card */}
            <div className="items-center">
              <label className="relative cursor-pointer">
                <Avatar
                  className="mx-auto mb-4 border-2 border-gray-300 p-1 flex transition-transform duration-300 ease-in-out transform hover:scale-105"
                  src={avatar}
                  alt="Exporter image"
                  size="large"
                  style={avatarStyle}
                />

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <div className="mt-2 text-center mb-7">
                <p className="text-lg text-gray-700 font-semibold mb-1">
                  {expname}
                </p>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm text-gray-600">{city}, India</p>
              </div>

              <div className="flex mr-7 gap-4 justify-center items-center mt-8">
                <Button className=" text-white-500 px-4 py-2 rounded-lg">
                  Edit Image
                </Button>
                <Button className=" text-white-500 px-4 py-2 rounded-lg">
                  Edit Details
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
