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
// import response from "../utils/demo/exporterData";

const ExporterTable = ({ resultsPerPage }) => {
  const { state } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);

  const fetchData = async () => {
    toast.loading("Loading...");
    await axios
      .get(`/postMaster/getRegisteredExporters/${state.user.email}`)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setResponse(res.data.data);
      })
      .catch((error) => {
        toast.remove();
        toast(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

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
              <TableCell>Company Name</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Pincode</TableCell>
              {/* <TableCell>Join Date</TableCell> */}
              <TableCell>City</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((exporter, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{exporter._id.slice(0, 7)}...</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{exporter.companyName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{exporter.phoneNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{exporter.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{exporter.pincode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{exporter.city}</span>
                </TableCell>
                {/* <TableCell>
                  <span className="text-sm">
                    {new Date(exporter.joined_Date).toLocaleDateString()}
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

export default ExporterTable;
