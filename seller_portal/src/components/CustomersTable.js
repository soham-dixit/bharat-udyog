import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Pagination,
} from "@windmill/react-ui";
import axios from "../axios/axios";
import toast from "react-hot-toast";

const CustomerTable = ({ resultsPerPage }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // Pagination change control
  const onPageChange = (p) => {
    setPage(p);
  };

  // Fetch customer data
  const fetchData = async () => {
    try {
      const response = await axios.get(`/customers?page=${page}&limit=${resultsPerPage}`);
      setData(response.data.customers);
      setTotalResults(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customer data.");
    }
  };

  // Fetch data on page load and page change
  useEffect(() => {
    fetchData();
  }, [page, resultsPerPage]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined on</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((customer, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={customer.avatar}
                      alt="Customer image"
                    />
                    <div>
                      <p className="font-semibold">{customer.firstName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{customer.lastName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{customer.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(customer.joinedOn).toLocaleDateString()}
                  </span>
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

export default CustomerTable;
