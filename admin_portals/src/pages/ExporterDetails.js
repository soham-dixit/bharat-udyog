import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, EyeIcon } from "../icons";
import {
  Card,
  CardBody,
  Badge,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Button,
} from "@windmill/react-ui";
import response from "../utils/demo/exporterData";

const ExporterDetails = () => {
  const { id } = useParams();
  let exporter = response.find((exporter) => exporter.exporter_id == id);

  if (!exporter) {
    return <div>Exporter not found</div>;
  }

  return (
    <div>
      <PageTitle>Exporter Details</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-700 dark:text-gray-300">
        <div className="flex items-center text-red-600">
          <Icon className="w-6 h-6" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/ExporterList" className="mx-2 text-red-600">
          Exporter List
        </NavLink>
        {">"}
        <p className="mx-2">{exporter.exporter_id}</p>
      </div>

      {/* Exporter Details */}
      <Card className="mt-4 shadow-md">
        <CardBody className="flex items-center">
          <Avatar src={exporter.avatar} alt={exporter.id} className="mr-4" />
          <div>
            <p className="text-lg font-semibold">Exporter ID: {exporter.exporter_id}</p>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-5 mb-5 shadow-md bg-gray-100 p-4">
        <CardBody>
          {/* Display details */}
          <p className="flex items-center font-semibold ml-1 text-gray-700 mb-3 mt-1">Exporter Details</p>

          <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 font-semibold mb-1">ID: {exporter.exporter_id}</p>
              <p className="text-gray-600 mb-1">Mobile No: {exporter.exporter_mobileno}</p>
              <p className="text-gray-600">Email: {exporter.exporter_emailid}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 font-semibold mb-1">Name: {exporter.exporter_name}</p>
              <p className="text-gray-600 mb-1">Pincode: {exporter.exporter_pincode}</p>
              <p className="text-gray-600">Join Date: {exporter.joined_Date}</p>
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
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="text-gray-600 font-semibold">Name</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">Authority</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">Date</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex ml-2">
                        <Button
                          icon={EyeIcon}
                          className="mr-3"
                          aria-label="Preview"
                          // onClick={() => handleEyeIconClick(Exporter)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExporterDetails;