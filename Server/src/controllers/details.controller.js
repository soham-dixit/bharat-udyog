import CustomsModel from "../models/customs.model.js";
import Data from "../models/dataSchema.model.js";
import DnkCentreModel from "../models/dnkCentre.model.js";
import PlaceOrderModel from "../models/order.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import ProductModel from "../models/product.model.js";
import createError from "../utils/createError.js";

export const getDnkCentreDetails = async (req, res, next) => {
  const { pincode } = req.params;

  const dnkCentre = await DnkCentreModel.findOne({ pincode });
  if (dnkCentre.length == 0) {
    return createError(req, res, next, "No Post Office found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Post Office details fetched successfully",
    data: dnkCentre,
  });
};

export const getAllDnkCentre = async (req, res, next) => {
  const data = await DnkCentreModel.find({});
  if (!data || data.length == 0) {
    return createError(req, res, next, "No Post Offices found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Post Office details fetched successfully",
    data,
  });
};

export const getAllCustomOffices = async (req, res, next) => {
  const data = await CustomsModel.find({});

  if (!data || data.length == 0) {
    return createError(req, res, next, "No custom offices found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Custom Office details fetched successfully",
    data,
  });
};

export const getAllProducts = async (req, res, next) => {
  const data = await ProductModel.find({});

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data,
  });
};

export const getOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Fetch the order from PlaceOrderModel
    const order = await PlaceOrderModel.findOne({ _id: orderId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Fetch the order status from OrderStatusModel
    const orderStatus = await OrderStatusModel.findOne({ orderId });

    if (!orderStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order status not found" });
    }

    // Determine the current status based on the specified conditions
    let status = "Pending";

    if (orderStatus.isReadyToShip) {
      if (orderStatus.isPostmanAssigned) {
        if (orderStatus.isPickedUp) {
          if (orderStatus.isDroppedAtDnk) {
            if (orderStatus.isVerifiedByDnk) {
              if (orderStatus.isShippedToCustom) {
                if (orderStatus.isVerifiedByCustom) {
                  if (orderStatus.isDispatched) {
                    status = "Order Completed";
                  } else {
                    status = "Verified by Customs";
                  }
                } else {
                  status = "Shipped to Customs";
                }
              } else {
                status = "Verified by Post Office";
              }
            } else {
              status = "Under Post Office Verification";
            }
          } else {
            status = "Picked up by Postman";
          }
        } else {
          status = "Ready for Pickup";
        }
      } else {
        status = "Postman not assigned";
      }
    }

    // Return the determined status
    res
      .status(200)
      .json({ success: true, message: "Order status fetched", status });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateOperationalCountries = async (req, res) => {
  try {
    const { operationalCountries } = req.body;

    // Create a new document with the operationalCountries array
    const result = await Data.create({ operationalCountries });

    res.status(200).json({
      success: true,
      message: "Operational countries added successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const fetchOperationalCountries = async (req, res, next) => {
  try {
    const data = await Data.find({});
    if (!data || data.length == 0) {
      return createError(
        req,
        res,
        next,
        "No operational countries found.",
        404
      );
    }

    res.status(200).json({
      success: true,
      message: "Operational countries fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
