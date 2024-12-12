import bcrypt from "bcryptjs";

import MasterLoginModel from "../models/masterLogin.model.js";
import ExporterModel from "../models/exporter.model.js";
import KycDetailsModel from "../models/kycDetails.model.js";
import ProductModel from "../models/product.model.js";
import createError from "../utils/createError.js";
import PlaceOrderModel from "../models/order.model.js";
import OrderStatusModel from "../models/orderStatus.model.js";
import { findIndexById } from "../utils/findIndex.js";
import { getOrderStatusForOrder } from "../utils/getOrderStatus.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import axios from "axios";
import { getUpcomingFestivals } from "./utils.controller.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const registerExporter = async (req, res, next) => {
  const {
    email,
    password,
    phoneNumber,
    companyName,
    city,
    address,
    pincode,
    // latitude,
    // longitude,
  } = req.body;

  // check if email exists
  let user = await ExporterModel.findOne({ email });
  if (user) {
    return createError(req, res, next, "Email already exists.", 400);
  }

  // save the user in database
  user = new ExporterModel({
    email,
    phoneNumber,
    companyName,
    city,
    address,
    pincode,
    // latitude,
    // longitude,
  });

  const savedUser = await user.save();
  if (!savedUser) {
    return createError(req, res, next, "Error in saving user.", 500);
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // save in masterlogin as well
  const masterLogin = new MasterLoginModel({
    email,
    password: hashedPassword,
    role: "Exporter",
    id: savedUser._id,
  }).save();

  if (!masterLogin) {
    return createError(req, res, next, "Error in saving user.", 500);
  }

  // return success response
  res.status(201).json({
    success: true,
    message: "Exporter registered successfully.",
    id: savedUser._id,
  });
};

export const saveKycDetails = async (req, res, next) => {
  const {
    documentName,
    documentNumber,
    documentIssuedBy,
    dateOfIssue,
    exporterId,
    photoUrl,
  } = req.body;

  // const documentUrl = req.file.filename;

  // save the details in mongodb
  const details = new KycDetailsModel({
    documentName,
    documentNumber,
    documentIssuedBy,
    dateOfIssue,
    documentUrl: photoUrl,
    exporterId,
  });

  const savedDetails = await details.save();
  if (!savedDetails) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  const updateExporter = await ExporterModel.findByIdAndUpdate(
    exporterId,
    { $set: { isKycSubmitted: true } },
    { new: true } // Return the updated document
  );

  if (!updateExporter) {
    return createError(
      req,
      res,
      next,
      "Failed to update exporter KYC status",
      500
    );
  }

  res.status(200).json({
    success: true,
    message: "KYC details saved successfully.",
  });
};

export const addProduct = async (req, res, next) => {
  const {
    exporterId,
    productName,
    price,
    description,
    availableQty,
    category,
    weight,
    photoUrl,
  } = req.body;
  const saveProduct = new ProductModel({
    exporterId,
    productName,
    price,
    description,
    availableQty,
    category,
    weight,
    photoUrl,
  });

  try {
    const response = await axios.post(
      "https://bharat-udyog.onrender.com/validate-product",
      {
        name: productName,
        category: category,
        description: description,
      }
    );

    if (response.data["is_exportable"] == true) {
      const savedProduct = await saveProduct.save();

      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4", // Ensure this is the correct model
        messages: [
          {
            role: "system",
            content: `You are an expert cultural product matcher specializing in Indian festivals and traditional products. Your task is to intelligently map products to their most culturally relevant festivals. 
  
          STRICT GUIDELINES:
  
          1. Cultural Specificity Threshold:
             - MUST associate only for traditional/cultural items.
             - MUST NOT associate for generic everyday items.
             - Prioritize deep cultural significance over superficial connections.
  
          2. Festival Association Criteria:
             - Direct ritual/ceremonial use.
             - Traditional attire relevance.
             - Symbolic meaning during specific festivals.
             - Seasonal alignment with festival traditions.
  
          3. Strict Filtering Guidelines:
             - Generic clothing (shirts, pants, generic sweaters): EMPTY LIST [].
             - Cultural clothing (kurtas, sarees, traditional wear): MULTIPLE FESTIVALS.
             - Decorative items (diyas, garlands): SPECIFIC FESTIVAL MATCHES.
             - Seasonal/special occasion items: CONTEXTUAL FESTIVAL ASSOCIATIONS.
  
          4. PRODUCT EVALUATION FRAMEWORK:
             - Analyze product name, description, category.
             - Assess cultural significance.
             - Determine precise festival relevance.
             - Return ONLY festivals from provided list.
  
          5. FESTIVALS LIST: ["New Year", "Lohri", "Pongal", "Uttarayan", "Makar Sankranti", "Subhas Chandra Bose Jayanti", "Republic Day", 
          "Basant Panchmi", "Saraswati Puja", "Mahashivratri", "Holika Dahan", "Holi", "Bank's Holiday", "Chaitra Navratri", 
          "Ugadi", "Gudi Padwa", "Cheti Chand", "Baisakhi", "Ambedkar Jayanti", "Chaitra Navratri Parana", "Ram Navami", 
          "Hanuman Jayanti", "Akshaya Tritiya", "Jagannath Rath Yatra", "Ashadhi Ekadashi", "Guru Purnima", "Hariyali Teej", 
          "Nag Panchami", "Independence Day", "Raksha Bandhan", "Kajari Teej", "Janmashtami", "Hartalika Teej", "Ganesh Chaturthi", 
          "Onam/Thiruvonam", "Anant Chaturdashi", "Gandhi Jayanti", "Sharad Navratri", "Durga Maha Navami Puja", 
          "Durga Puja Ashtami", "Dussehra", "Karva Chauth", "Dhanteras", "Narak Chaturdashi", "Diwali", "Govardhan Puja", 
          "Bhai Dooj", "Chhath Puja", "Children's Day", "Merry Christmas"]
  
          Your output must be in the following format:
          - A JSON array of festival names.
          - An empty array [] if the product is not culturally significant.
          - A maximum of 3-4 festivals for each culturally significant product.
  
          Only return festivals from the provided list.`,
          },
          {
            role: "user",
            content: `Here are the product details:
          Product Name: ${productName}
          Description: ${description}
          Category: ${category}
          Price: ₹${price}
          Weight: ${weight} kg`,
          },
        ],
      });

      console.log(
        "OpenAI Response:",
        openaiResponse.choices[0].message.content
      );

      const festivals = JSON.parse(openaiResponse.choices[0].message.content);

      saveProduct.festivals = festivals;

      await saveProduct.save();

      if (!savedProduct) {
        return createError(req, res, next, "Failed to save in DB", 400);
      }
      res.status(200).json({
        success: true,
        message: "Product saved successfully with festival recommendations.",
        data: savedProduct,
      });
    } else {
      return createError(
        req,
        res,
        next,
        "Product violates export guidelines.",
        400
      );
    }
  } catch (error) {
    console.error("Error processing product:", error);
    return createError(req, res, next, "Error processing product", 500);
  }
};

export const getAllProducts = async (req, res, next) => {
  const { exporterId } = req.params;
  const products = await ProductModel.find({ exporterId });
  if (!products || products.length == 0) {
    return createError(req, res, next, "No products found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
};

export const getOrderDetails = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await PlaceOrderModel.findById(orderId);
  if (!order || order.length == 0) {
    return createError(req, res, next, "No order found", 404);
  }

  const status = await OrderStatusModel.find({ orderId });
  if (!status || status.length == 0) {
    return createError(req, res, next, "No status found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    order,
    status,
  });
};

export const markForPickUp = async (req, res, next) => {
  const { orderId } = req.params;

  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    { $set: { isReadyToShip: true, readyToShipDate: Date.now() } },
    { new: true }
  );
  if (!updateStatus) {
    return createError(req, res, next, "Failed to update status", 400);
  }

  res.status(200).json({
    success: true,
    message: "Status updated successfully.",
  });
};

export const getExporterDetails = async (req, res, next) => {
  const { exporterId } = req.params;

  const data = await ExporterModel.findById(exporterId);
  if (!data) {
    return createError(req, res, next, "No exporter found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Exporter details fetched successfully.",
    data,
  });
};

export const verifyPin = async (req, res, next) => {
  const { orderId, pin } = req.params;
  // const { pin } = req.body;

  console.log(pin);
  // if (!pin) {
  //   return createError(req, res, next, "Please provide pin", 400);
  // }

  const isVerified = await PlaceOrderModel.findById(orderId);

  if (!isVerified || isVerified.length == 0) {
    return createError(req, res, next, "No order found", 404);
  }

  console.log(isVerified.pin);

  if (isVerified.pin != pin) {
    return createError(req, res, next, "Wrong pin please re-enter again.", 400);
  }

  const updateStatus = await OrderStatusModel.findOneAndUpdate(
    { orderId },
    { $set: { isPickedUp: true, isPickedUpDate: Date.now() } },
    { new: true }
  );

  if (!updateStatus) {
    return createError(req, res, next, "Failed to update date.", 400);
  }

  res.status(200).json({
    success: true,
    message: "Pin verified",
  });
};

export const getStatusOfAllOrders = async (req, res, next) => {
  try {
    const { exporterId } = req.params;

    const orderIds = await PlaceOrderModel.find({
      exporterId,
    });

    console.log(orderIds);

    if (!orderIds || orderIds.length === 0) {
      return createError(req, res, next, "No orders found", 404);
    }

    // Use Promise.all to fetch order status for each orderId concurrently
    const ordersPromises = orderIds.map(async (order) => {
      const orderStatus = await OrderStatusModel.findOne({
        orderId: order._id,
      });
      return orderStatus;
    });

    const orders = await Promise.all(ordersPromises);

    console.log(orders);

    // Now 'orders' array contains the combined data
    res.status(200).json({ orders });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return createError(req, res, next, "Internal Server Error", 500);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { exporterId } = req.params;
    const orders = await PlaceOrderModel.find({ exporterId });

    if (!orders || orders.length === 0) {
      return createError(req, res, next, "No orders found", 404);
    }

    const orderIds = orders.map((order) => order._id);

    // Use Promise.all to fetch order status and order data for each orderId concurrently
    const ordersPromises = orderIds.map(async (orderId) => {
      const orderData = await PlaceOrderModel.findOne({ _id: orderId });
      const orderStatus = await getOrderStatusForOrder(orderId);
      return {
        orderData,
        ...orderStatus,
        _id: orderId, // Add orderId to the result for reference
      };
    });

    const ordersWithStatus = await Promise.all(ordersPromises);

    // Now 'ordersWithStatus' array contains the combined data
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders: ordersWithStatus,
    });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return createError(req, res, next, "Internal Server Error", 500);
  }
};

export const getInvoiceDetails = async (req, res, next) => {
  const { orderId } = req.params;

  const order = await PlaceOrderModel.findById(orderId);
  if (!order || order.length == 0) {
    return createError(req, res, next, "No order found", 404);
  }

  const exporterId = order.exporterId;
  const exporter = await ExporterModel.findById(exporterId);
  if (!exporter || exporter.length == 0) {
    return createError(req, res, next, "No exporter found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Invoice details fetched successfully",
    data: {
      order,
      exporter,
    },
  });
};

export const getProductDetails = async (req, res, next) => {
  const { productId } = req.params;

  const product = await ProductModel.findById(productId);
  if (!product || product.length == 0) {
    return createError(req, res, next, "No Product Found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product details fetched successfully",
    product,
  });
};

export const updateProductDetails = async (req, res, next) => {
  const { productId } = req.params;
  const { productName, price, description, availableQty, category, weight } =
    req.body;

  const updateproduct = await ProductModel.findByIdAndUpdate(productId, {
    $set: {
      productName,
      price,
      description,
      availableQty,
      category,
      weight,
    },
  });

  if (!updateproduct) {
    return createError(req, res, next, "Failed to update details", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product details updated successfully",
  });
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return createError(req, res, next, "Product not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error); // Passes the error to the global error handler
  }
};
