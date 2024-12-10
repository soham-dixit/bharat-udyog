import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Input,
  Button,
} from "@windmill/react-ui";
// import DnkCenterTable from "../components/DnkCenterTable";
import CustomOfficeListTable from "../components/CustomOfficeListTable";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const CustomOfficeList = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);

  return (
    <div>
      <PageTitle>Post Office</PageTitle>

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
        <p className="mx-2">Custom Office List</p>
      </div>

      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center  space-x-4">
            {/* Add New Postman Button */}
            <Link to={`/app/admin/addCustomOffice`}>
              <Button className="bg-red-700 text-white  hover:bg-red-500">
                Add New Custom Office
              </Button>
            </Link>

            {/* Search Bar */}
            <div className="relative w-1/3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-5.2-5.2"
                  />
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <Input
                type="text"
                placeholder="Search by Name / Pincode"
                className="pl-10 pr-8 py-2 border rounded-md w-full"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <span className="ml-1 mb-8 text-gray-700 font-semibold">Post Office List</span>
      <div className="mt-4">
        <CustomOfficeListTable resultsPerPage={resultsPerPage} />
      </div>
    </div>
  );
};

export default CustomOfficeList;
