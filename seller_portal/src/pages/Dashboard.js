
import React, { useState } from "react";

import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { CartIcon, MoneyIcon, PeopleIcon, TruckIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { Input } from "@windmill/react-ui";
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import OrdersTable from "../components/AllOrdersTable";

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  return (
    <div>
      <PageTitle>
        Dashboard
        <p className="mt-4 text-xl font-semibold">
          <span>Select Month</span>
          <Input
            required
            className="mt-2"
            type="month"
            placeholder=""
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </p>
      </PageTitle>

      <h1 className="mb-4  font-semibold text-gray-700 dark:text-gray-200">
        Order Analytics
      </h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total order" value="0">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-green-500 dark:text-orange-100"
            bgColorClass="bg-green-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending order" value="0">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-purple-500 dark:text-blue-100"
            bgColorClass="bg-purple-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Ready for Pickup" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-orange-500 dark:text-green-100"
            bgColorClass="bg-orange-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Picked up by Postman" value="0">
          <RoundIcon
            icon={TruckIcon}
            iconColorClass="text-yellow-500 dark:text-blue-100"
            bgColorClass="bg-yellow-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Dropped at DNK" value="0">
          <RoundIcon
            icon={TruckIcon}
            iconColorClass="text-yellow-500 dark:text-blue-100"
            bgColorClass="bg-yellow-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Verified by DNK" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-red-500 dark:text-blue-100"
            bgColorClass="bg-red-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Verified by Custom" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Dispatched" value="0">
          <RoundIcon
            icon={TruckIcon}
            iconColorClass="text-blue-500 dark:text-green-100"
            bgColorClass="bg-blue-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Order Analytics">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Product Sale Analytics">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div>

      <PageTitle>Orders</PageTitle>
      <OrdersTable resultsPerPage={10} />
    </div>
  );
}

export default Dashboard;
