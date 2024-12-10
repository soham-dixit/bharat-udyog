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
// import response from "../utils/demo/postmanData";

const OrdersTable = ({ resultsPerPage }) => {
  const { state } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);

  // pagination setup
  const totalResults = response.length;

  const fetchData = async () => {
    toast.loading("Loading...");

    await axios
      .get(`/postmaster/getRegisteredPostman/${state.user.id}`)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setResponse(res.data.data);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    filteredData = response;

    // Slice the data for the current page
    const slicedData = filteredData.slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
    );

    setData(slicedData);
  }, [page, resultsPerPage, response]);

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Pincode</TableCell>
              {/* <TableCell>Join Date</TableCell> */}
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((postman, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{postman._id.slice(0, 7)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">
                        {postman.name ? postman.name : "Not yet registered"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {postman.phoneNumber
                      ? postman.phoneNumber
                      : "Not yet registered"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {postman.email ? postman.email : "Not yet registered"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{postman.pincode}</span>
                </TableCell>
                {/* <TableCell>
                  <span className="text-sm">
                    {new Date(postman.joined_on).toLocaleDateString()}
                  </span>
                </TableCell> */}
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
