import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink, Link } from "react-router-dom";
import { HomeIcon, EyeIcon } from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  TableBody,
  Badge,
  Button,
  Pagination,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
} from "@windmill/react-ui";
import response from "../components/PendingOrdersTable";
import UserContext from "../context/User/UserContext";
import axios from "../axios/axios";
import toast from "react-hot-toast";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  const { state } = useContext(UserContext);

  // Table and grid data handlling
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const [filter, setFilter] = useState("all");
  const [dateSort, setSort] = useState("Newest");
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(`/exporter/getAllOrders/${state.user.id}`);
      toast.success(res.data.message);
      console.log(res.data.orders);

      let filteredOrders = res.data.orders.filter((order) => {
        if (filter === "all") return true;
        return order.status.toLowerCase() === filter.toLowerCase();
      });

      // Sorting logic based on date
      if (dateSort === "Newest") {
        filteredOrders.sort(
          (a, b) =>
            new Date(b.orderData.orderDate) - new Date(a.orderData.orderDate)
        );
      } else if (dateSort === "Oldest") {
        filteredOrders.sort(
          (a, b) =>
            new Date(a.orderData.orderDate) - new Date(b.orderData.orderDate)
        );
      }

      setData(
        filteredOrders.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    fetchData();
  }, [page, resultsPerPage, filter, dateSort]);

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null);

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleFilter = (filter_name) => {
    console.log(filter_name);
    if (filter_name == "All") {
      setFilter("all");
    }
    if (filter_name == "Pending") {
      setFilter("Pending");
    }
    if (filter_name == "Ready for Pickup") {
      setFilter("Ready for Pickup");
    }
    if (filter_name == "Picked up by Postman") {
      setFilter("Picked up by Postman");
    }
    if (filter_name == "Dropped at DNK") {
      setFilter("Dropped at DNK");
    }
    if (filter_name == "Verified by DNK") {
      setFilter("Verified by DNK");
    }
    if (filter_name == "Verified by Custom") {
      setFilter("Verified by Custom");
    }
    if (filter_name == "Dispatched") {
      setFilter("Dispatched");
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

  return (
    <div>
      <PageTitle> All Orders</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-color">
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
        <p className="mx-2">Current Orders</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter Orders
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Picked up by Postman">
                  Picked up by Postman
                </option>
                <option value="Dropped at DNK">Dropped at DNK</option>
                <option value="Verified by DNK">Verified by DNK</option>
                <option value="Verified by Custom">Verified by Custom</option>
                <option value="Dispatched">Dispatched</option>
              </Select>
            </Label>

            <p className="text-sm text-gray-600 dark:text-gray-400">
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
              <div className="relative text-gray-500 focus-within:text-color dark:focus-within:text-purple-400">
                <input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={resultsPerPage}
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  Results on Table
                </div>
              </div>
            </Label>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      {/* <OrdersTable
        resultsPerPage={resultsPerPage}
        filter={filter}
        dateSort={dateSort}
      /> */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{user?.orderData?._id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">
                        {user?.orderData?.orderedBy}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user?.orderData?.productName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    Rs {user?.orderData?.price * user?.orderData?.qty}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user?.orderData?.status === "Pending"
                        ? "danger"
                        : user?.orderData?.status === "Ready for Pickup"
                        ? "warning"
                        : user?.orderData?.status === "Picked up by Postman"
                        ? "warning"
                        : user?.orderData?.status === "Dropped at DNK"
                        ? "warning"
                        : user?.orderData?.status === "Verified by DNK"
                        ? "warning"
                        : user?.orderData?.status === "Verified by Custom"
                        ? "warning"
                        : user?.orderData?.status === "Dispatched"
                        ? "Success"
                        : "neutral"
                    }
                  >
                    {user?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user?.orderData?.orderDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Link to={`/app/orderdetails/${user?.orderData?._id}`}>
                      <Button
                        icon={EyeIcon}
                        className="mr-3"
                        aria-label="Preview"
                      />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default Orders;
