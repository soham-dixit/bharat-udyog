import React, {useState} from "react";

import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TruckIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import { Input, Label, Button, Select, Card, CardBody } from '@windmill/react-ui';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import DnkTable from "../../components/DnkCenterTable";

function Dashboard() {
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
        <Card className="mt-5 mb-5 shadow-md">
          <CardBody>
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative w-full mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2" />
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

            {/* Select State and District Dropdowns */}
            <div className="flex items-center">
              <p className="text-sm text-gray-700 dark:text-gray-400 ml-2">
                Select State
              </p>

              <Label className="mx-3">
              <Select
                  id="state"
                  className="mt-1"
                  placeholder="Choose a state"
                  
                >
                  <option>All</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                </Select>
              </Label>
              
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Select District
              </p>

              <Label className="mx-3">
              <Select
                  id="district"
                  className="mt-1"
                  placeholder="Choose a district"
                  
                >
                  <option>All</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
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

      <DnkTable resultsPerPage={10} />
    </div>
  );
}

export default Dashboard;
