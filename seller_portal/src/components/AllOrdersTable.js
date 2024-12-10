import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { EditIcon, EyeIcon, HomeIcon, TrashIcon, UserIcon } from "../icons";
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
// import response from "../utils/demo/ordersData";
import axios from "../axios/axios";
import UserContext from "../context/User/UserContext";
import toast from "react-hot-toast";

const OrdersTable = ({ resultsPerPage, filter, dateSort }) => {
  const { state } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  function onPageChange(p) {
    setPage(p);
  }

  const fetchData = async () => {
    toast.loading("Fetching data");
    try {
      const res = await axios.get(`/exporter/getAllOrders/${state.user.id}`);
      toast.remove();
      toast.success(res.data.message);
      setResponse(res.data.orders);
    } catch (error) {
      console.error(error);
      toast.remove();
      toast.error(error.response?.data?.message || "Error fetching orders");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    // If Filters Applied
    if (filter === "In Process") {
      filteredData = response.filter((order) => order.status === "In Process");
    } else if (filter === "PO induction pending") {
      filteredData = response.filter(
        (order) => order.status === "PO induction pending"
      );
    } else if (filter === "Under Custom") {
      filteredData = response.filter(
        (order) => order.status === "Under Custom"
      );
    } else if (filter === "Dispatched") {
      filteredData = response.filter((order) => order.status === "Dispatched");
    } else if (filter === "Completed") {
      filteredData = response.filter((order) => order.status === "Completed");
    } else {
      // if filters not applied
      filteredData = response;
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
              <TableCell>Customer Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
  {data.map((order, i) => (
    <TableRow key={i}>
      <TableCell>
        <span className="text-sm">{order.orderData._id.slice(0, 5)}...</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{order.orderData.orderedBy}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{order.orderData.productName}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          Rs {order.orderData.price * order.orderData.qty}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          type={
            order.status === "In Process"
              ? "danger"
              : order.status === "PO induction pending"
              ? "warning"
              : order.status === "Under Custom"
              ? "warning"
              : order.status === "Dispatched"
              ? "warning"
              : order.status === "Completed"
              ? "success"
              : "neutral"
          }
        >
          {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {new Date(order.orderData.orderDate).toLocaleDateString()}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex">
          <Link to={`/app/orderdetails/${order.orderData._id}`}>
            <Button icon={EyeIcon} className="mr-3" aria-label="Preview" />
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
