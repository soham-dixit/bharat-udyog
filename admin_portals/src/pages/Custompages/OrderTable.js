import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { EditIcon, EyeIcon, HomeIcon, TrashIcon } from "../../icons";
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
import response from "../../utils/demo/ordersData";

const OrdersTable = ({ resultsPerPage, filter, dateSort }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    // If Filters Applied
    if (filter === "Custom approved") {
      filteredData = response.filter(
        (order) => order.status === "Custom approved"
      );
    } else if (filter === "Custom detained") {
      filteredData = response.filter(
        (order) => order.status === "Custom detained"
      );
    } else if (filter === "Dispatched") {
      filteredData = response.filter((order) => order.status === "Dispatched");
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
  }, [page, resultsPerPage, filter, dateSort]);

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Order ID</TableCell>
              <TableCell>Exporter Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{user.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.productname}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Rs {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user.status === "Custom detained"
                        ? "danger"
                        : user.status === "Custom approved"
                        ? "warning"
                        : user.status === "Dispatched"
                        ? "success"
                        : "neutral"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Link to={`/app/orderdetails/${user.id}`}>
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
