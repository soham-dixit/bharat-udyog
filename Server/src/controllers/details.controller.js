import axios from "axios";
import CustomsModel from "../models/customs.model.js";
import Data from "../models/dataSchema.model.js";
import DnkCentreModel from "../models/dnkCentre.model.js";
import PlaceOrderModel from "../models/order.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import ProductModel from "../models/product.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

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

export const recommendedProducts = async (req, res, next) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res.status(400).json({ 
        message: "User email is required" 
      });
    }

    // Step 1: Get recommended product IDs from FastAPI recommendation service
    const recommendationResponse = await axios.get(
      `${process.env.FASTAPI_BASE_URL}/getRecommendation/${encodeURIComponent(email)}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract product IDs
    const productIds = recommendationResponse.data;

    // If no recommendations found
    if (!productIds || productIds.length === 0) {
      return res.status(404).json({ 
        message: "No product recommendations found" 
      });
    }

    // Step 2: Fetch full product details from MongoDB
    const products = await ProductModel.find({
      _id: { $in: productIds.map(id => new mongoose.Types.ObjectId(id)) }
    }).lean(); // Use .lean() for better performance

    // Optional: Sort products based on the order of recommendation IDs
    const sortedProducts = productIds.map(id => 
      products.find(product => product._id.toString() === id)
    ).filter(product => product); // Remove any undefined products

    // Step 3: Return recommended products
    res.status(200).json({
      message: "Recommendations fetched successfully",
      recommendations: sortedProducts,
      totalRecommendations: sortedProducts.length
    });

  } catch (error) {
    // Comprehensive error handling
    console.error('Recommendation Fetch Error:', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json({
        message: "Error fetching recommendations",
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(500).json({
        message: "No response from recommendation service",
        details: error.message
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({
        message: "Internal server error during recommendation fetch",
        details: error.message
      });
    }
  }
};
