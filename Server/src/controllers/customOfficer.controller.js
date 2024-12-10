import bcrypt from "bcryptjs";

import CustomsModel from "../models/customs.model.js";
import MasterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import PlaceOrderModel from "../models/order.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";

export const registerCustomOfficer = async (req, res, next) => {
  const { name, password, email } = req.body;

  // Check if email exists
  const user = await CustomsModel.findOne({ email });
  if (user) {
    return createError(req, res, next, "Custom officer already exists.", 400);
  }

  // update email in database
  const updateName = await CustomsModel.findOneAndUpdate(
    { email },
    { $set: { isAssigned: true, officerName: name } },
    { new: true }
  );

  if (!updateName) {
    return createError(req, res, next, "Email not found", 404);
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Save the details in database
  const postMaster = new MasterLoginModel({
    email,
    password: hashPassword,
    role: "Custom Officer",
    id: updateName._id,
  });

  const save = await postMaster.save();
  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Custom Officer registered successfully",
  });
};

export const getOrders = async (req, res, next) => {
  const { officerId } = req.params;

  const orders = await PlaceOrderModel.find({ isShippedToCustom: true });

  if (!orders || orders.length == 0) {
    return createError(req, res, next, "No orders found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
  });
};

export const verifyOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        isVerifiedByCustom: true,
        customVerifiedDate: Date.now(),
      },
    },
    {
      new: true,
    }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to update status.", 400);
  }

  res.status(200).json({
    success: true,
    message: "Order verified successfully",
  });
};
