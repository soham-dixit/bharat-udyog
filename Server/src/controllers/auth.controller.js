import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import masterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import PostManModel from "../models/postMan.model.js";
import ExporterModel from "../models/exporter.model.js";

export const loginUser = async (req, res, next) => {
  const { email, password, latitude, longitude, role } = req.body;

  // Check if the user exists
  const user = await masterLoginModel.findOne({ email: email, role: role });

  if (!user) {
    return createError(req, res, next, "User doesn't exist", 404);
  }

  if (user.role == "Postman") {
    const updateLocation = await PostManModel.findOneAndUpdate(
      { email },
      { $set: { latitude, longitude } },
      { new: true }
    );

    if (!updateLocation)
      return createError(req, res, next, "Failed to update location.", 400);
  }

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {    
    return createError(req, res, next, "Invalid password", 400);
  }

  // Create and assign a token
  const userData = { email: user.email, role: user.role, id: user.id };
  if (role == "Exporter") {
    const exporterDetails = await ExporterModel.findOne({ email });
    userData.isVerified = exporterDetails.isVerified;
    userData.isDenied = exporterDetails.isDenied;
    userData.isKycSubmitted = exporterDetails.isKycSubmitted;
  }
  const token = jwt.sign(userData, process.env.TOKEN_SECRET);

  // Set token in cookie
  res.cookie("auth-token", token, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: userData,
  });
};
