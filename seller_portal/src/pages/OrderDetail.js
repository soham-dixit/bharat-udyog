import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, PeopleIcon, CartIcon, TruckIcon, MoneyIcon } from "../icons";
import {
  Card,
  CardBody,
  Badge,
  Avatar,
  Button,
  Input,
} from "@windmill/react-ui";
// import response from "../utils/demo/ordersData";
import toast from "react-hot-toast";
import axios from "../axios/axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OrderDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState([]);
  const [pin, setPin] = useState("");

  const verifyPin = async (e) => {
    e.preventDefault();
    await axios
      .get(`/exporter/verifyPin/${id}/${pin}`)
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const fetchData = async () => {
    await axios
      .get(`/exporter/getOrderDetails/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setOrder(res.data.order);
        console.log(res.data.order);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data.message);
      });

    await axios
      .get(`/details/getOrderStatus/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setStatus(res.data.status);
        console.log(res.data.status);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async () => {
    await axios
      .put(`exporter/markForPickUp/${id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });

    fetchData();
  };

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <PageTitle>Order Details</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-700 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-6 h-6" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/orders" className="mx-2 text-purple-600">
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
              <p className="text-lg font-semibold">Order ID : {order._id}</p>
              <Badge
                type={
                  status === "Pending"
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
                className="mr-5"
              >
                {status}
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
                  Customer Info
                </p>
              </div>
              <div className="flex mt-4">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p className="text-sm text-gray-500">Email ID:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.orderedBy}</p>
                  <p className="text-sm text-gray-800">{order.phoneNumber}</p>
                  <p className="text-sm text-gray-800">{order.email}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <Icon
                  className="w-6 h-6 text-green-500"
                  aria-hidden="false"
                  icon={CartIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Order Info
                </p>
              </div>
              <div className="flex mt-3">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Product Name:</p>
                  <p className="text-sm text-gray-500">Quantity:</p>
                  <p className="text-sm text-gray-500">Price: Rs</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.productName}</p>
                  <p className="text-sm text-gray-800">{order.qty}</p>
                  <p className="text-sm text-gray-800">
                    {order.price * order.qty}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mt-5">
                <Icon
                  className="w-6 h-6 text-yellow-500"
                  aria-hidden="false"
                  icon={TruckIcon}
                />
                <p className="text-lg font-semibold text-gray-700 ml-2">
                  Shipping Info
                </p>
              </div>
              <div className="flex mt-3">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm text-gray-500">Country:</p>
                  <p className="text-sm text-gray-500">Zip Code:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">{order.address}</p>
                  <p className="text-sm text-gray-800">{order.country}</p>
                  <p className="text-sm text-gray-800">{order.pincode}</p>
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
                  Payment Info
                </p>
              </div>
              <div className="flex mt-3">
                <div className="ml-7 mt-3 mb-3">
                  <p className="text-sm text-gray-500">Payment:</p>
                  <p className="text-sm text-gray-500">Amount: Rs</p>
                  <p className="text-sm text-gray-500">Time:</p>
                </div>
                <div className="mt-3 mb-3 ml-3">
                  <p className="text-sm text-gray-800">Online</p>
                  <p className="text-sm text-gray-800">
                    {order.price * order.qty}
                  </p>
                  <p className="text-sm text-gray-800">
                    {new Date(order?.orderDate).toLocaleDateString()}{" "}
                    {new Date(order?.orderDate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              {status == "Pending" && (
                <>
                  <Button
                    onClick={updateStatus}
                    style={{ marginRight: "10px" }}
                  >
                    Request Pickup
                  </Button>
                  <Button onClick={updateStatus}>Drop at Post Office</Button>
                </>
              )}
              {status == "Ready for Pickup" && (
                <form className="flex gap-2" onSubmit={verifyPin}>
                  <Input
                    type="text"
                    name="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your pin"
                    required
                  />
                  <Button type="submit" onClick={verifyPin}>
                    Verify Pin
                  </Button>
                </form>
              )}
              <Link className="mx-8" to={`/app/invoicegenerate/${order._id}`}>
                <Button>Generate Invoice</Button>
              </Link>
            </div>
            {/* <Button onClick={() => history.push(`/app/invoicegenerate/${order._id}`)}>
              Generate Invoice
            </Button> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderDetails;
