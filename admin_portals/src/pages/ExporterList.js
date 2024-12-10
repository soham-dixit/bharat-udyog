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
import OrdersTable from "../components/ExporterTable";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const PostmanList = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [dateSort, setSort] = useState("Newest");

  const handleSort = (Sort) => {
    if (Sort == "Newest") {
      setSort("Newest");
    }
    if (Sort == "Oldest") {
      setSort("Oldest");
    }
  };

  return (
    <div>
      <PageTitle>Exporter</PageTitle>

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
        <p className="mx-2">Exporter List</p>
      </div>

      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center  space-x-4">
            {/* Search Bar */}
            <div className="relative w-full  ml-3 mr-3">
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
                placeholder="Search by Exporter ID / Name"
                className="pl-10 pr-8 py-2 border rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex items-center mt-4 ">
            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option>Newest</option>
                <option>Oldest</option>
              </Select>
            </Label>

            <Label className="">
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={resultsPerPage}
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                  Results on Table
                </div>
              </div>
            </Label>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <span className="ml-1 mb-8 text-gray-700 font-semibold">
        Registered Exporters
      </span>
      <div className="mt-4">
        <OrdersTable resultsPerPage={resultsPerPage} />
      </div>
    </div>
  );
};

export default PostmanList;
