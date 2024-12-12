import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { EditIcon, EyeIcon, HomeIcon, TrashIcon } from "../icons";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
  Badge,
  Button,
} from "@windmill/react-ui";
import axios from "../axios/axios";
import UserContext from "../context/User/UserContext";
import toast from "react-hot-toast";
// import response from "../utils/demo/ordersData";

const OrdersTable = ({ resultsPerPage, filter, dateSort }) => {
  const { state } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);

  // pagination setup
  const totalResults = response?.length;

  const fetchData = async () => {
    toast.loading("Loading...");
    await axios
      .get(`/postMaster/getAllOrders/${state.user.email}`)
      .then((res) => {
        toast.remove();
        console.log(res.data.orders);
        toast.success(res.data.message);
        setResponse(res.data.orders);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    // If Filters Applied
    if (filter === "Pending") {
      filteredData = response.filter(
        (order) =>
          order.status === "Pending" || order.status === "No status available"
      );
    } else if (filter === "Ready for Pickup") {
      filteredData = response.filter(
        (order) => order.status === "Ready for Pickup"
      );
    } else if (filter === "Picked up by Postman") {
      filteredData = response.filter(
        (order) => order.status === "Picked up by Postman"
      );
    } else if (filter === "Dropped at Post Office") {
      filteredData = response.filter(
        (order) => order.status === "Dropped at Post Office"
      );
    } else if (filter === "Verified by Post Office") {
      filteredData = response.filter(
        (order) => order.status === "Verified by Post Office"
      );
    } else if (filter === "Verified by Custom") {
      filteredData = response.filter(
        (order) => order.status === "Verified by Custom"
      );
    } else if (filter === "Under Post Office Verification") {
      filteredData = response.filter(
        (order) => order.status === "Under Post Office Verification"
      );
    } else if(filter === "Group By"){
      
    } else {
      // if filters not applied
      filteredData = response.filter((order) => order.status !== "Dispatched");
    }

    filteredData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === "Newest" ? dateB - dateA : dateA - dateB;
    });

    // Slice the data for the current page
    const slicedData = filteredData.slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
    );

    setData(slicedData);
  }, [page, resultsPerPage, filter, dateSort, response]);

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Order ID</TableCell>
              <TableCell>Consumer Email</TableCell>
              <TableCell>Product Name</TableCell>
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
                  <span className="text-sm">
                    {user?.order?._id.slice(0, 7)}...
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user?.order?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user?.order?.productName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    Rs {user?.order?.price * user?.order?.qty}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user.status === "Custom detained"
                        ? "danger"
                        : user.status === "PostOffice approved"
                        ? "warning"
                        : user.status === "Custom approved"
                        ? "warning"
                        : user.status === "Dispatched"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {user.status == "No status available"
                      ? "Pending"
                      : user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user?.order?.orderDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Link
                      to={`/app/postmaster/consumerOrderDetails/${user?.order?._id}`}
                    >
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

export default OrdersTable;
