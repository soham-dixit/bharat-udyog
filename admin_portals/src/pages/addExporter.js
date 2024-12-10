import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, EyeIcon } from "../icons";
import {
  Card,
  CardBody,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";
import axios from "../axios/axios";
import UserContext from "../context/User/UserContext";
import toast from "react-hot-toast";
import ImageModal from "../components/ImageModal";

// import response from "../utils/demo/exporterData";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  const { state } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedExporter, setSelectedExporter] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState();
  const totalResults = response?.length;
  const [kycDetails, setKycDetails] = useState({});
  const [preview, setPreview] = useState(false);
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    toast.loading("Loading...");
    await axios
      .get(`/postmaster/getPendingExporters/${state.user.email}`)
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

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    filteredData = response;

    // Slice the data for the current page
    const slicedData = filteredData?.slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
    );

    setData(slicedData);
  }, [page, resultsPerPage, response]);

  const handleEyeIconClick = async (Exporter) => {
    setSelectedExporter(Exporter);
    await axios
      .get(`/postmaster/getExporterKycDetails/${Exporter._id}`)
      .then((res) => {
        setKycDetails(res.data.data[0]);
        setShowDetails(true);
        console.log(res.data);
      });
  };

  // Function to handle accept action
  const handleAccept = async () => {
    toast.loading("Verifying exporter");
    setShowDetails(false);
    await axios
      .put(`/postmaster/verifyExporter/${selectedExporter._id}`)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  // Function to handle deny action
  const handleDeny = async () => {
    toast.loading("Rejecting exporter");
    setShowDetails(false);
    await axios
      .put(`/postmaster/rejectExporter/${selectedExporter._id}`)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <PageTitle>Add New Exporter</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-red-600">
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
        <NavLink exact to="/app/ExporterList" className="mx-2 text-red-600">
          Orders
        </NavLink>
        {">"}
        <p className="mx-2">Add Exporter</p>
      </div>

      {showDetails ? (
        <Card className="mt-5 mb-5 shadow-md bg-gray-100 p-4">
          <CardBody>
            {/* Display details */}
            <p className="flex items-center font-semibold ml-1 text-gray-700 mb-3 mt-1">
              Exporter Details
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-semibold mb-1">
                  ID: {selectedExporter._id}
                </p>
                <p className="text-gray-600 mb-1">
                  Mobile No: {selectedExporter.phoneNumber}
                </p>
                <p className="text-gray-600">Email: {selectedExporter.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-semibold mb-1">
                  Company Name: {selectedExporter.companyName}
                </p>
                <p className="text-gray-600 mb-1">
                  Pincode: {selectedExporter.pincode}
                </p>
                {/* <p className="text-gray-600">
                  Request Date: {selectedExporter.req_Date}
                </p> */}
              </div>
            </div>
            <div className="mt-2 mb-2">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-semibold mb-2">Documents:</p>
                <TableContainer className="mb-8">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>Document</TableCell>
                        <TableCell>Issued by</TableCell>
                        <TableCell>Date of Issue</TableCell>
                        <TableCell>Preview</TableCell>
                      </tr>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">
                                {kycDetails?.documentName}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {kycDetails?.documentIssuedBy}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {kycDetails?.dateOfIssue}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex ml-2">
                            <Button
                              icon={EyeIcon}
                              className="mr-3"
                              aria-label="Preview"
                              onClick={() =>
                                // handleEyeIconClick(selectedExporter)
                                {
                                  setUrl(kycDetails.documentUrl);
                                  openModal();
                                }
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* {preview && <img src={url} />} */}
              <ImageModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                url={url}
              />
            </div>

            <div className="mt-8 mb-2 ml-2  gap-4 flex justify-center items-center">
              <Button
                onClick={handleAccept}
                className="bg-red-700 w-40 text-white hover:bg-red-500"
              >
                Approve
              </Button>
              <Button
                onClick={handleDeny}
                className="bg-red-700 w-40 text-white hover:bg-red-500"
              >
                Deny
              </Button>
              <Button
                onClick={handleDeny}
                className="bg-red-700 w-40 text-white hover:bg-red-500"
              >
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="mt-5 mb-5 shadow-md">
          <CardBody>
            {/* Content for the card body */}
            <p className="flex items-center  text-gray-700  mb-2 mt-2">
              To accept request click on EyeIcon
            </p>
          </CardBody>
        </Card>
      )}

      <span className="ml-1 mb-8 text-gray-700 font-semibold">
        Registration Request
      </span>
      <div className="mt-4">
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
                <TableCell>Action</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data?.map((Exporter, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm">
                      {Exporter._id?.slice(0, 7)}...
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{Exporter.companyName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{Exporter.phoneNumber}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{Exporter.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{Exporter.pincode}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex ml-2">
                      <Button
                        icon={EyeIcon}
                        className="mr-3"
                        aria-label="Preview"
                        onClick={() => handleEyeIconClick(Exporter)}
                      />
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
    </div>
  );
};

export default Orders;
