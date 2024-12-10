import bcrypt from "bcryptjs";

import DnkCentreModel from "../models/dnkCentre.model.js";
import MasterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import PostManModel from "../models/postMan.model.js";
import ExporterModel from "../models/exporter.model.js";
import KycDetailsModel from "../models/kycDetails.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import PlaceOrderModel from "../models/order.model.js";
import { determineOrderStatus } from "../utils/getOrderStatus.js";
import { generatePassword } from "../utils/generatePassword.js";
import { sendEmail } from "../utils/sendMail.js";

export const registerPostMaster = async (req, res, next) => {
  const { name, password, email } = req.body;

  // update email in database
  const updateName = await DnkCentreModel.findOneAndUpdate(
    { email },
    { $set: { postMasterName: name, isAssigned: true } },
    { new: true }
  );

  if (!updateName) {
    return createError(
      req,
      res,
      next,
      "Postmaster for this Email doesn't exists.",
      400
    );
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Save the details in database
  const postMaster = new MasterLoginModel({
    email,
    password: hashPassword,
    role: "Post Master",
    id: updateName._id,
  });

  const save = await postMaster.save();
  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Post Master registered successfully",
  });
};

export const addPostMan = async (req, res, next) => {
  const { email, postmasterId, phoneNumber, name } = req.body;
  // const user = await MasterLoginModel.findOne({ email });
  // if (user) {
  //   return createError(req, res, next, "Postman already exists.", 400);
  // }

  const isRegistered = await PostManModel.find({ email });
  if (!isRegistered) {
    return createError(req, res, next, "Postman already exists.", 400);
  }

  // console.log(postmasterId);

  // check if dnk with this pincode exists
  const dnkCentre = await DnkCentreModel.findById(postmasterId);
  console.log(dnkCentre);
  if (!dnkCentre) {
    return createError(req, res, next, "Dnk not found with pincode", 400);
  }

  // Register postman
  const postMan = new PostManModel({
    email,
    pincode: dnkCentre.pincode,
    phoneNumber,
    name,
  });

  const save = await postMan.save();

  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  const pincode = dnkCentre.pincode;

  // Update postman in dnkCentre array of postman ids
  const update = await DnkCentreModel.findOneAndUpdate(
    { pincode },
    { $push: { postManIds: save._id } },
    { new: true }
  );

  if (!update) {
    return createError(req, res, next, "Failed to update postman id", 400);
  }

  const password = generatePassword();
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Send the password to email
  sendEmail(
    [
      {
        email,
      },
    ],
    "Login Password",
    "Dear user please use the below password to login.",
    `<h2>Your password to login is: ${password}</h2>`
  );

  // Save the details in database
  const superAdmin = new MasterLoginModel({
    email,
    password: hashPassword,
    role: "Postman",
    id: postMan._id,
  });

  const saveSuperAdmin = await superAdmin.save();
  if (!saveSuperAdmin) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Postman registered successfully",
  });
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { email } = req.params;
    const details = await DnkCentreModel.findOne({ email });

    if (!details) {
      return createError(req, res, next, "DNK centre not found", 404);
    }

    const pincode = details.pincode;

    // Fetch all exporter ids from ExporterModel with the same pincode
    const exporterIds = await ExporterModel.find({ pincode }).select("_id");

    if (!exporterIds || exporterIds.length === 0) {
      return createError(
        req,
        res,
        next,
        "No exporters found with the given pincode",
        404
      );
    }

    const exporterIdArray = exporterIds.map((exporter) => exporter._id);

    // Get all orders where exporterId is in the array of exporterIds
    const orders = await PlaceOrderModel.find({
      exporterId: { $in: exporterIdArray },
    });

    if (!orders || orders.length === 0) {
      return createError(
        req,
        res,
        next,
        "No orders found for the exporters with the given pincode",
        404
      );
    }

    // Fetch order status for each order from OrderStatusModel
    const ordersWithStatus = [];

    for (const order of orders) {
      const orderStatus = await OrderStatusModel.findOne({
        orderId: order._id,
      });

      const status = determineOrderStatus(orderStatus);

      ordersWithStatus.push({
        order,
        status,
      });
    }

    console.log("Orders with Status are: ", ordersWithStatus);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders: ordersWithStatus,
    });
  } catch (error) {
    console.error(error);
    return createError(req, res, next, "Internal Server Error", 500);
  }
};

export const getExporterKycDetails = async (req, res, next) => {
  const { exporterId } = req.params;
  const data = await KycDetailsModel.find({ exporterId });

  if (!data) {
    return createError(req, res, next, "No kyc details found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Kyc details fetched successfully.",
    data,
  });
};

export const getRegisteredExporters = async (req, res, next) => {
  const { emailId } = req.params;

  const dnk = await DnkCentreModel.find({ email: emailId });

  if (!dnk) {
    return createError(req, res, next, "Error fetching dnk.", 404);
  }

  const details = await ExporterModel.find({
    pincode: dnk[0].pincode,
    isVerified: true,
  });

  if (!details || details.length == 0) {
    return createError(req, res, next, "No exporters found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Exporters fetched successfully",
    data: details,
  });
};

export const getPendingExporters = async (req, res, next) => {
  const { emailId } = req.params;

  const dnk = await DnkCentreModel.find({ email: emailId });
  if (!dnk) {
    return createError(req, res, next, "Error fetching dnk.", 404);
  }

  const details = await ExporterModel.find({
    pincode: dnk[0].pincode,
    isVerified: false,
  });

  if (!details || details.length == 0) {
    return createError(req, res, next, "No exporters found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Exporters fetched successfully",
    data: details,
  });
};

export const verifyExporter = async (req, res, next) => {
  const { exporterId } = req.params;
  // update the isVerified to true by id
  const update = await ExporterModel.findByIdAndUpdate(
    exporterId,
    { isVerified: true },
    { new: true }
  );

  if (!update) {
    return createError(req, res, next, "Failed to update status", 400);
  }

  res.status(200).json({
    success: true,
    message: "Exporter successfully verified",
  });
};

export const assignPostman = async (req, res, next) => {
  const { orderId, email } = req.params;

  const assign = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        isPostmanAssigned: true,
        postmanAssignDate: Date.now(),
        assignedPostman: email,
      },
    },
    { new: true }
  );

  if (!assign) {
    return createError(req, res, next, "Failed to assign postman", 400);
  }

  res.status(200).json({
    success: true,
    message: "Postman successfully assigned",
  });
};

export const getDnkOrders = async (req, res, next) => {
  const { email } = req.params;

  const dnk = await DnkCentreModel.find({ email });

  if (!dnk || dnk.length == 0) {
    return createError(req, res, next, "No DNK centres found", 404);
  }

  const orders = await PlaceOrderModel.find({ pincode: dnk[0].pincode });

  if (!orders || orders.length == 0) {
    return createError(req, res, next, "No orders found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
};

export const verifyOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    { $set: { isVerifiedByDnk: true, dnkVerifiedDate: Date.now() } },
    { new: true }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to update status", 400);
  }

  res.status(200).json({
    success: true,
    message: "Order successfuly verified",
  });
};

export const rejectExporter = async (req, res, next) => {
  const { exporterId } = req.params;
  const updateStatus = await ExporterModel.findByIdAndUpdate(
    exporterId,
    { isDenied: true },
    { new: true }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to update status", 400);
  }

  res.status(200).json({
    success: true,
    message: "Exporter successfully rejected",
  });
};

export const getRegisteredPostman = async (req, res, next) => {
  const { dnkCentreId } = req.params;
  let postmen = [];
  const dnk = await DnkCentreModel.findById(dnkCentreId);
  if (!dnk) {
    return createError(req, res, next, "No dnk found", 404);
  }

  for (let i = 0; i < dnk.postManIds.length; i++) {
    const postman = await PostManModel.findById(dnk.postManIds[i]);
    postmen.push(postman);
  }
  res.status(200).json({
    success: true,
    message: "Postman fetched successfully",
    data: postmen,
  });
};

export const getPostman = async (req, res, next) => {
  const { dnkcentreId } = req.params;
  const dnk = await DnkCentreModel.findById(dnkcentreId);
  if (!dnk || dnk.length == 0) {
    return createError(req, res, next, "No dnk found", 404);
  }

  const postman = await PostManModel.find({ pincode: dnk.pincode });
  if (!postman || postman.length == 0) {
    return createError(req, res, next, "No postman found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Postman fetched successfully",
    data: postman,
  });
};

export const shipToCustom = async (req, res, next) => {
  const { orderId } = req.params;

  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        isShippedToCustom: true,
        isShipToCustomDate: Date.now(),
      },
    },
    { new: true }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to ship.", 400);
  }

  res.status(200).json({
    success: true,
    message: "Shipped to custom successfully",
  });
};
