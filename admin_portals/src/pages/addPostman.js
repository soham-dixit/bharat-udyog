import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, EyeIcon } from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Input,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";

import toast from "react-hot-toast";
import axios from "../axios/axios";
import UserContext from "../context/User/UserContext";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  const { state } = useContext(UserContext);
  const initialState = {
    email: "",
    postmasterId: state.user.id,
    name: "",
    phoneNumber: "",
  };
  const [details, setDetails] = useState(initialState);

  

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.loading("Adding postman");

    await axios
      .post("/postMaster/addPostman", details)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setDetails(initialState);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <PageTitle>Add New Postman</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-red-600">
          <Icon
            className="w-5 h-5"
            aria-hidden="true"
            color="red-600"
            icon={HomeIcon}
          />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/PostmanList" className="mx-2 text-red-600">
          Postman List
        </NavLink>
        {">"}
        <p className="mx-2">Add Postman</p>
      </div>

      <main className="flex-1 items-center justify-center p-6 sm:p-12 w-full">
        <form onSubmit={onSubmitHandler}>
          <div className="w-full">
            <div className="flex gap-5">
              <div style={{ flexGrow: 1 }}>
                <Label className="mt-2 text-lg">
                  <span>Email</span>
                  <Input
                    className="mt-2"
                    type="email"
                    placeholder="john@gmail.com"
                    required
                    onChange={onChangeHandler}
                    value={details?.email}
                    name="email"
                  />
                </Label>
                <Label className="mt-2 text-lg">
                  <span>Phone Number</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter your Phone Number"
                    required
                    onChange={onChangeHandler}
                    value={details?.phoneNumber}
                    name="phoneNumber"
                  />
                </Label>
              </div>
              <Label className="mt-2 text-lg">
                <span>Postman Name</span>
                <Input
                  className="mt-2"
                  type="text"
                  placeholder="Enter Postman name"
                  required
                  onChange={onChangeHandler}
                  value={details?.name}
                  name="name"
                />
              </Label>
            </div>

            {/* <Link to="/otp"> */}
            <Button
              className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
              block
              type="submit"
            >
              Submit
            </Button>

            {/* </Link> */}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Orders;
