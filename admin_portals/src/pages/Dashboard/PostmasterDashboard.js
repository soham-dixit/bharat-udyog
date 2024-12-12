import React, {useState} from "react";

import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TruckIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import { Input, Label, Button, Select } from '@windmill/react-ui';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import OrdersTable from "../../components/PendingOrdersTable";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/User/UserContext";
import OrderAnalyticsCharts from "../../components/Chart/OrderAnalytics";

function Dashboard() {
  const { state } = useContext(UserContext);

  const [resultsPerPage, setResultPerPage] = useState(10);
 

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v4/postMaster/getAllOrders/${state.user.email}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div>
      <PageTitle>Dashboard
      

      </PageTitle>

      <div>
        
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
      </div>
      <h1 className="mb-4  mt-6 font-semibold text-gray-700 dark:text-gray-200">Order Analytics</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total order" value="0">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-green-500 dark:text-orange-100"
            bgColorClass="bg-green-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="PostOffice approved" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-orange-500 dark:text-green-100"
            bgColorClass="bg-orange-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="In transit" value="0">
          <RoundIcon
            icon={TruckIcon}
            iconColorClass="text-orange-500 dark:text-green-100"
            bgColorClass="bg-orange-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Under process @Custom" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-yellow-500 dark:text-blue-100"
            bgColorClass="bg-yellow-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Custom approved" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-purple-500 dark:text-blue-100"
            bgColorClass="bg-purple-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Custom detained" value="0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-red-500 dark:text-blue-100"
            bgColorClass="bg-red-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Dispatched out of India" value="0">
          <RoundIcon
            icon={TruckIcon}
            iconColorClass="text-blue-500 dark:text-green-100"
            bgColorClass="bg-blue-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Completed order" value="0">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>


      <PageTitle>Current Orders</PageTitle>
      {/* Table */}
      <OrdersTable
        resultsPerPage={resultsPerPage}
      />
      <h2 className="text-2xl font-semibold mb-6">Order Analytics</h2>
      <OrderAnalyticsCharts orders={orders} />
    </div>
  );
}

export default Dashboard;
