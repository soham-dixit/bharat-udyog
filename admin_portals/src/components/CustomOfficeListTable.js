import React, { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
// import response from "../utils/demo/dnkcenterData";

const CustomOfficeListTable = ({ resultsPerPage }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const fetchData = async () => {
    toast.loading("Loading...");
    await axios
      .get("/details/getAllCustomOffices")
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setResponse(res.data.data);
        console.log(res.data);
      })
      .catch((e) => {
        toast.remove();
        toast.error(e.response.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    // If Filters Applied
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
              <TableCell>Custom Office Email</TableCell>
              <TableCell>District</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Custom Officer</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </tr>
          </TableHeader>
          <TableBody>
            {data?.map((dnkcenter, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className=" font-semibold text-sm">
                    {dnkcenter.email}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="text-sm">{dnkcenter.district}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{dnkcenter.state}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{dnkcenter.pincode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {dnkcenter.officerName
                      ? dnkcenter.officerName
                      : "Not yet registered"}
                  </span>
                </TableCell>
                {/* <TableCell>
                  <div className="flex">
                    <Link to={`/app/DnkCenterDetails/${dnkcenter.officeName}`}>
                      <Button
                        icon={EyeIcon}
                        className="mr-3"
                        aria-label="Preview"
                      />
                    </Link>
                  </div>
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

export default CustomOfficeListTable;
