import bcrypt from "bcryptjs";

import PostManModel from "../models/postMan.model.js";
import MasterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import PlaceOrderModel from "../models/order.model.js";
import { findIndexById } from "../utils/findIndex.js";
import ExporterModel from "../models/exporter.model.js";

export const registerPostman = async (req, res, next) => {
  const { name, phoneNumber, password, email, latitude, longitude } = req.body;

  // const user = await MasterLoginModel.findOne({ email });

  // if (user) {
  //   return createError(req, res, next, "Email already exists.", 400);
  // }

  const updateName = await PostManModel.findOneAndUpdate(
    { email },
    { $set: { name, phoneNumber, latitude, longitude } },
    { new: true }
  );

  if (!updateName) {
    return createError(
      req,
      res,
      next,
      "Postman for this Email doesn't exists.",
      400
    );
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Save the details in database
  const postMan = new MasterLoginModel({
    email,
    password: hashPassword,
    role: "Postman",
    id: updateName._id,
  });

  const save = await postMan.save();
  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Postman registered successfully",
    id: updateName._id,
  });
};

export const getPostmanData = async (req, res, next) => {
  const { postmanId } = req.params;

  const postman = await PostManModel.findById(postmanId);

  if (!postman) {
    return createError(req, res, next, "Postman not found", 400);
  }

  res.status(200).json({
    success: true,
    postman,
  });
};

export const getPostmanOrders = async (req, res, next) => {
  const { emailId } = req.params;

  // find all orderId from orderstatus table with assignedpostman email
  const orderIds = await OrderStatusModel.find({
    assignedPostman: emailId,
  });
  // console.log(orderIds);

  if (!orderIds || orderIds.length == 0) {
    return createError(req, res, next, "No orders found", 404);
  }

  let orders = [];

  // find all orders from order table with orderIds
  for (let i = 0; i < orderIds.length; i++) {
    const order = await PlaceOrderModel.find({ _id: orderIds[i].orderId });
    orders.push(order[0]);
  }
  // console.log(orders);

  let combinedData = [];
  for (let i = 0; i < orders.length; i++) {
    combinedData.push({
      productName: orders[i].productName,
      name: orders[i].orderedBy,
      city: orders[i].city,
      pin: orders[i].pin,
      ...orderIds[findIndexById(orderIds, orders[i]._id)].toObject(),
    });
  }

  // console.log(combinedData);

  res.status(200).json({
    success: true,
    orders: combinedData,
  });
};

// export const getPostmanOrders = async (req, res, next) => {
//   try {
//     const { emailId } = req.params;

//     const combinedData = await OrderStatusModel.aggregate([
//       {
//         $match: { assignedPostman: emailId },
//       },
//       {
//         $lookup: {
//           from: "placeorders", // Name of the PlaceOrderModel collection
//           localField: "orderId",
//           foreignField: "_id",
//           as: "orderDetails",
//         },
//       },
//       {
//         $unwind: "$orderDetails", // Unwind to flatten the array
//       },
//       {
//         $project: {
//           productName: "$orderDetails.productName",
//           name: "$orderDetails.orderedBy",
//           city: "$orderDetails.city",
//           _id: 1,
//           orderId: 1,
//           isReadyToShip: 1,
//           isPostmanAssigned: 1,
//           assignedPostman: 1,
//           isVerifiedByDnk: 1,
//           isVerifiedByCustom: 1,
//           readyToShipDate: 1,
//           postmanAssignDate: 1,
//           dnkVerifiedDate: 1,
//           customVerifiedDate: 1,
//           __v: 1,
//         },
//       },
//     ]);

//     if (!combinedData || combinedData.length === 0) {
//       return createError(req, res, next, "No orders found", 404);
//     }

//     res.status(200).json({
//       success: true,
//       orders: combinedData,
//     });
//   } catch (error) {
//     console.error(error);
//     return createError(req, res, next, "Internal Server Error", 500);
//   }
// };

export const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Find the order details
    const orderDetail = await PlaceOrderModel.findById(orderId);

    if (!orderDetail) {
      return createError(req, res, next, "Order not found", 404);
    }

    // Find the exporter details to get latitude and longitude
    const exporterDetail = await ExporterModel.findById(
      orderDetail.exporterId
    ).select("latitude longitude");

    if (!exporterDetail) {
      return createError(req, res, next, "Exporter not found", 404);
    }

    // Combine order details with exporter location
    const responseData = {
      ...orderDetail.toObject(), // Convert Mongoose document to plain object
      exporterLocation: {
        latitude: exporterDetail.latitude,
        longitude: exporterDetail.longitude,
      },
    };

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      orderDetail: responseData,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    createError(req, res, next, "Failed to fetch order details", 500);
  }
};

export const dropAtDnkCentre = async (req, res, next) => {
  const { orderId } = req.params;

  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    { $set: { isDroppedAtDnk: true, isDroppedAtDnkDate: Date.now() } },
    { new: true }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to update status", 400);
  }

  res.status(200).json({
    success: true,
    message: "Order dropped at DNK successfully",
  });
};
