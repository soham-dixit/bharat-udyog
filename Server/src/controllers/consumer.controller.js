import bcrypt from "bcryptjs";

import ConsumerLoginModel from "../models/consumer.model.js";
import MasterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import PlaceOrderModel from "../models/order.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import ExporterModel from "../models/exporter.model.js";
import { sendEmail } from "../utils/sendMail.js";
import ProductModel from "../models/product.model.js";

export const registerConsumer = async (req, res, next) => {
  const { name, mobileNumber, pincode, country, state, city, email, password } =
    req.body;

  // const user = await MasterLoginModel.findOne({ email });

  // if (user) {
  //   return createError(req, res, next, "User already exists.", 400);
  // }

  const checkMobileNumber = await ConsumerLoginModel.findOne({ mobileNumber });

  if (checkMobileNumber) {
    return createError(req, res, next, "Mobile number already exists.", 400);
  }

  const consumer = new ConsumerLoginModel({
    name,
    mobileNumber,
    pincode,
    country,
    state,
    city,
    email,
  });

  const saveUser = await consumer.save();
  if (!saveUser) {
    return createError(req, res, next, "Failed to save user in DB", 400);
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Save the details in database
  const consumerLogin = new MasterLoginModel({
    email,
    password: hashPassword,
    role: "Consumer",
    id: saveUser._id,
  });

  const save = await consumerLogin.save();
  if (!save) {
    return createError(req, res, next, "Failed to save user in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Consumer registered successfully.",
    consumerId: saveUser._id,
  });
};

export const getConsumerData = async (req, res, next) => {
  const { consumerId } = req.params;

  const consumer = await ConsumerLoginModel.findById(consumerId);

  if (!consumer) {
    return createError(req, res, next, "Consumer doesn't exists.", 400);
  }

  res.status(200).json({
    success: true,
    message: "Consumer data fetched successfully.",
    consumer,
  });
};

export const placeOrder = async (req, res, next) => {
  const {
    productId,
    productName,
    price,
    qty,
    orderedBy,
    email,
    country,
    pincode,
    phoneNumber,
    state,
    city,
    address,
    exporterId,
    photoUrl,
  } = req.body;

  // generate a 4 digit pin
  const pin = Math.floor(1000 + Math.random() * 9000);

  const order = new PlaceOrderModel({
    productId,
    productName,
    price,
    qty,
    orderedBy,
    email,
    country,
    pincode,
    phoneNumber,
    state,
    city,
    address,
    exporterId,
    photoUrl,
    pin,
  });

  const saveOrder = await order.save();
  if (!saveOrder) {
    return createError(req, res, next, "Failed to save order in DB", 400);
  }
  const orderStatus = new OrderStatusModel({
    orderId: saveOrder._id,
  });

  const saveOrderStatus = await orderStatus.save();
  if (!saveOrderStatus) {
    return createError(
      req,
      res,
      next,
      "Failed to save order status in DB",
      400
    );
  }

  const exporter = await ExporterModel.findById(exporterId);
  const emailId = exporter.email;
  sendEmail(
    [
      {
        email: emailId,
      },
    ],
    "Regarding order placed.",
    `Order has been placed by ${orderedBy} for product ${productName}`,
    `<h1>Order has been placed by ${orderedBy} for product ${productName}</h1>`
  );

  // decerease the quantity in products collection
  const product = await ProductModel.findByIdAndUpdate(productId, {
    $inc: {
      availableQty: -qty,
    },
  });

  await product.save();
  if (!product) {
    return createError(req, res, next, "Failed to update product.", 400);
  }

  res.status(201).json({
    success: true,
    message: "Order placed successfully.",
    orderId: saveOrder._id,
  });
};

export const getConsumerOrder = async (req, res, next) => {
  const { email } = req.params;

  const orders = await PlaceOrderModel.find({ email });
  if (!orders || orders.length == 0) {
    return createError(req, res, next, "No orders found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully.",
    orders,
  });
};

export const getOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;

  const orderStatus = await OrderStatusModel.find({ orderId });

  if (!orderStatus || orderStatus.length == 0) {
    return createError(req, res, next, "Failed to fetch order status.", 400);
  }

  res.status(200).json({
    success: true,
    message: "Order status fetched successfully.",
    status: orderStatus,
  });
};
