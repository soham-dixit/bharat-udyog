import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select, Input } from "@windmill/react-ui";
import OrdersTable from "../components/AllOrdersTable";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  // pagination setups
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const [dateSort, setSort] = useState("Newest");

  const handleFilter = (filter_name) => {
    // console.log(filter_name);
    if (filter_name == "All") {
      setFilter("all");
    }
    if (filter_name == "PostOffice approved") {
      setFilter("PostOffice approved");
    }
    if (filter_name == "Custom detained") {
      setFilter("Custom detained");
    }
    if (filter_name == "Custom approved") {
      setFilter("Custom approved");
    }
    if (filter_name == "Dispatched") {
      setFilter("Dispatched");
    }
    if (filter_name == "Completed") {
      setFilter("Completed");
    }
  };

  const handleSort = (Sort) => {
    if (Sort == "Newest") {
      setSort("Newest");
    }
    if (Sort == "Oldest") {
      setSort("Oldest");
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <PageTitle> All Orders</PageTitle>

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
        <p className="mx-2">All Orders</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <p className=" mb-4  font-semibold">
            <span className="ml-1 mb-1 text-gray-700">Select Month</span>
            <Input
              required
              className="mt-2"
              type="month"
              placeholder=""
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </p>
          <div className="flex items-center mt-2 ">
            <p className="text-sm text-gray-700 dark:text-gray-400 ml-2">
              Filter Orders
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option>All</option>
                <option>PostOffice approved</option>
                <option>Custom approved</option>
                <option>Custom detained</option>
                <option>Dispatched</option>
                <option>Completed</option>
              </Select>
            </Label>

            <p className="text-sm text-gray-700 dark:text-gray-400">
              Sort by Date
            </p>

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
      <OrdersTable
        resultsPerPage={resultsPerPage}
        filter={filter}
        dateSort={dateSort}
      />
    </div>
  );
};

export default Orders;
