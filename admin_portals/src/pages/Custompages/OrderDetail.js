import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../../components/Icon";
import PageTitle from "../../components/Typography/PageTitle";
import {
  HomeIcon,
  PeopleIcon,
  CartIcon,
  TruckIcon,
  MoneyIcon,
} from "../../icons";
import {
  Card,
  CardBody,
  Badge,
  Avatar,
  InfoCard,
  RoundIcon,
} from "@windmill/react-ui";
import response from "../../utils/demo/ordersData";

const OrderDetails = () => {
  const { id } = useParams();
  let order = response.filter((order) => order.id == id)[0];

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <PageTitle>Order Details</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-700 dark:text-gray-300">
        <div className="flex items-center text-red-600">
          <Icon className="w-6 h-6" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/orders" className="mx-2 text-red-600">
          Orders
        </NavLink>
        {">"}
        <p className="mx-2">{order.id}</p>
      </div>

      {/* Order Details */}
      <Card className="mt-4 shadow-md">
        <CardBody>
          <div className="flex items-center mb-4">
            <Avatar src={order.avatar} alt={order.id} className="mr-4" />
            <div>
              <p className="text-lg font-semibold">Order ID : {order.id}</p>
              <Badge
                type={
                  order.status === "Custom detained"
                    ? "danger"
                    : order.status === "Custom approved"
                    ? "warning"
                    : order.status === "Dispatched"
                    ? "success"
                    : "neutral"
                }
                className="mr-5"
              >
                {order.status}
              </Badge>
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
                  className="w-6 h-6 text-blue-500"
                  aria-hidden="false"
                  icon={PeopleIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Exporter Info
                </p>
              </div>
              <div className="flex mt-4">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p className="text-sm text-gray-500">Email ID:</p>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm text-gray-500">Country:</p>
                  <p className="text-sm text-gray-500">Pincode:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.exp_name}</p>
                  <p className="text-sm text-gray-800">{order.exp_mobileno}</p>
                  <p className="text-sm text-gray-800">{order.exp_emailid}</p>
                  <p className="text-sm text-gray-800">{order.exp_address}</p>
                  <p className="text-sm text-gray-800">{order.exp_country}</p>
                  <p className="text-sm text-gray-800">{order.exp_zipcode}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <Icon
                  className="w-6 h-6 text-purple-500"
                  aria-hidden="false"
                  icon={TruckIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Consumer Info
                </p>
              </div>
              <div className="flex mt-4">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p className="text-sm text-gray-500">Email ID:</p>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm text-gray-500">Country:</p>
                  <p className="text-sm text-gray-500">Pincode:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.send_name}</p>
                  <p className="text-sm text-gray-800">{order.send_mobileno}</p>
                  <p className="text-sm text-gray-800">{order.send_emailid}</p>
                  <p className="text-sm text-gray-800">{order.send_address}</p>
                  <p className="text-sm text-gray-800">{order.send_country}</p>
                  <p className="text-sm text-gray-800">{order.send_zipcode}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mt-5">
                <Icon
                  className="w-6 h-6 text-red-500"
                  aria-hidden="false"
                  icon={MoneyIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  DNK Info
                </p>
              </div>
              <div className="flex mt-3">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Post Office Name:</p>
                  <p className="text-sm text-gray-500">Pincode:</p>
                  <p className="text-sm text-gray-500">State:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">
                    {order.dnkcenter_name}
                  </p>
                  <p className="text-sm text-gray-800">
                    {order.dnkcenter_pincode}
                  </p>
                  <p className="text-sm text-gray-800">State name</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mt-5">
                <Icon
                  className="w-6 h-6 text-green-500"
                  aria-hidden="false"
                  icon={CartIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Parcel Info
                </p>
              </div>
              <div className="flex mt-3">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Product Name:</p>
                  <p className="text-sm text-gray-500">Volumetric_weight:</p>
                  <p className="text-sm text-gray-500">Date:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.productname}</p>
                  <p className="text-sm text-gray-800">
                    {order.Volumetric_weight} Kg
                  </p>
                  <p className="text-sm text-gray-800">{order.date}</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderDetails;
