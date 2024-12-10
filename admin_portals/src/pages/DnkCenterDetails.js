import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, PeopleIcon, CartIcon, TruckIcon, MoneyIcon } from "../icons";
import {
  Card,
  CardBody,
  Badge,
  Avatar,
  InfoCard,
  RoundIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import response from "../utils/demo/dnkcenterData";

const DnkCenterDetails = () => {
  const { name } = useParams();
  let dnkcenter = response.find(
    (dnkcenter) => dnkcenter.dnkcenter_name === name
  );

  if (!dnkcenter) {
    return <div>Post Office not found</div>;
  }

  return (
    <div>
      <PageTitle>Post Office Details</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-700 dark:text-gray-300">
        <div className="flex items-center text-red-600">
          <Icon className="w-6 h-6" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Post Office Center</p>
      </div>

      {/* dnkcenter Details */}
      <Card className="mt-4 shadow-md">
        <CardBody>
          <div className="flex items-center mb-4">
            <div>
              <p className="text-lg font-semibold">
                {dnkcenter.dnkcenter_name}
              </p>
              <p className="text-sm ">{dnkcenter.dnkcenter_district}, India</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-4 mb-4 shadow-md">
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <Icon
                  className="w-6 h-6 text-purple-500"
                  aria-hidden="false"
                  icon={TruckIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Post Office Center Info
                </p>
              </div>
              <div className="flex mt-4">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm text-gray-500">District:</p>
                  <p className="text-sm text-gray-500">State:</p>
                  <p className="text-sm text-gray-500">Pincode:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{dnkcenter.send_name}</p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.send_mobileno}
                  </p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.send_emailid}
                  </p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.send_address}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <Icon
                  className="w-6 h-6 text-blue-500"
                  aria-hidden="false"
                  icon={PeopleIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Postmaster Info
                </p>
              </div>
              <div className="flex mt-4">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">ID:</p>
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p className="text-sm text-gray-500">Email ID:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">
                    {dnkcenter.postmaster_id}
                  </p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.postmaster_name}
                  </p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.postmaster_mobileno}
                  </p>
                  <p className="text-sm text-gray-800">
                    {dnkcenter.postmaster_emailid}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 mb-2">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 font-semibold mb-2">Orders:</p>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Exporter ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">Order ID</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">Exporter ID</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">Date</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex ml-2">
                          {/* <Badge
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
                                    }>
                                    {user.status}
                                </Badge> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DnkCenterDetails;
