import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import ChartCard from "../components/Chart/ChartCard";
import ChartLegend from "../components/Chart/ChartLegend";
import InfoCard from "../components/Cards/InfoCard";
import RoundIcon from "../components/RoundIcon";
import PageTitle from "../components/Typography/PageTitle";
import { PeopleIcon, CartIcon, MoneyIcon, TruckIcon } from "../icons";
import { Input } from "@windmill/react-ui";

function Dashboard() {
  const [lineOptions, setLineOptions] = useState(null);
  const [lineLegends, setLineLegends] = useState([]);
  const [doughnutOptions, setDoughnutOptions] = useState(null);
  const [doughnutLegends, setDoughnutLegends] = useState([]);

  useEffect(() => {
    // Hardcoded data for now
      const response = {
        "success": true,
        "message": "Forecast generated successfully",
        "recommendations": {
            "Chikankari Embroidery": 574,
            "Jaipur Blue Pottery": 114,
            "Kashmiri Shawl": 9849,
            "Madhubani Painting": 2172,
            "Pattachitra Paintings": 6,
            "Saaree": 8,
            "Wood Carvings from Saharanpur": 34,
            "Wooden Basket": 3321
        },
        "mapped_products": [
            {
                "product_name": "Kashmiri Shawl",
                "available_qty": 17,
                "mapped_festivals": [
                    {
                        "festival_name": "Lohri",
                        "month": "January",
                        "date": "14",
                        "day": "Sunday"
                    },
                    {
                        "festival_name": "Merry Christmas",
                        "month": "December",
                        "date": "25",
                        "day": "Wednesday"
                    }
                ]
            },
            {
                "product_name": "Madhubani Painting",
                "available_qty": 28,
                "mapped_festivals": []
            },
            {
                "product_name": "Jaipur Blue Pottery",
                "available_qty": 8,
                "mapped_festivals": []
            },
            {
                "product_name": "Chikankari Embroidery",
                "available_qty": 37,
                "mapped_festivals": [
                    {
                        "festival_name": "Lohri",
                        "month": "January",
                        "date": "14",
                        "day": "Sunday"
                    },
                    {
                        "festival_name": "Pongal, Uttarayan, Makar Sankranti",
                        "month": "January",
                        "date": "15",
                        "day": "Monday"
                    }
                ]
            },
            {
                "product_name": "Pattachitra Paintings",
                "available_qty": 37,
                "mapped_festivals": []
            },
            {
                "product_name": "Wood Carvings from Saharanpur",
                "available_qty": 13,
                "mapped_festivals": []
            },
            {
                "product_name": "Terracotta Pottery",
                "available_qty": 28,
                "mapped_festivals": []
            },
            {
                "product_name": "Saaree",
                "available_qty": 20,
                "mapped_festivals": [
                    {
                        "festival_name": "Lohri",
                        "month": "January",
                        "date": "14",
                        "day": "Sunday"
                    }
                ]
            },
            {
                "product_name": "Wooden Basket",
                "available_qty": 20,
                "mapped_festivals": []
            }
        ]
    };
    transformDataForCharts(response);
    // fetch("http://localhost:7000/forecast", {
    //   method: "POST",
    //   headers: {

    //     "Content-Type": "application/json",

    //   },
    //   body: JSON.stringify({
    //     "target_month": 12,
    //     "seller_id": "675876ada06c3d098e4a4aa0"
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => transformDataForCharts(response))
    //   .catch((error) => console.error("Error fetching data: ", error));

  }, []);

  const transformDataForCharts = (response) => {
    // Line Chart Data
    const lineLabels = Object.keys(response.recommendations); // e.g., product names
    const lineData = Object.values(response.recommendations); // e.g., product quantities
    setLineOptions({
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: "Predicted Demand",
            data: lineData,
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    setLineLegends([
      { title: "Predicted Demand", color: "#36A2EB" },
    ]);

    const doughnutLabels = Object.keys(response.recommendations);
    const doughnutData = Object.values(response.recommendations);
    setDoughnutOptions({
      data: {
        labels: doughnutLabels,
        datasets: [
          {
            data: doughnutData,
            backgroundColor: doughnutLabels.map(
              () => "#" + Math.floor(Math.random() * 16777215).toString(16)
            ),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    setDoughnutLegends(
      doughnutLabels.map((label, index) => ({
        title: label,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }))
    );
  };

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  return (
    <>
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
        <div>
          <ChartCard title="Order Analytics">
            {lineOptions && <Line {...lineOptions} />}
            {lineLegends && <ChartLegend legends={lineLegends} />}
          </ChartCard>

          <ChartCard title="Product Sale Analytics">
            {doughnutOptions && <Doughnut {...doughnutOptions} />}
            {doughnutLegends && <ChartLegend legends={doughnutLegends} />}
          </ChartCard>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
