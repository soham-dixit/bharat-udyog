import DnkCentreModel from "../models/dnkCentre.model.js";
import CustomsModel from "../models/customs.model.js";
import MasterLoginModel from "../models/masterLogin.model.js";
import createError from "../utils/createError.js";
import { generatePassword } from "../utils/generatePassword.js";
import { encrypt } from "../utils/crypto.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendMail.js";

export const registerDnkCentre = async (req, res, next) => {
  const {
    email,
    officeName,
    phoneNumber,
    district,
    state,
    pincode,
    postMasterName,
  } = req.body;
  const centre = await DnkCentreModel.findOne({
    $or: [{ email }, { pincode }],
  });

  // Return error if centre exists
  if (centre) {
    return createError(req, res, next, "DNK Centre already exists.", 400);
  }

  // const newPhoneNumber = encrypt(phoneNumber);
  // Save the details in database
  const dnkCentre = new DnkCentreModel({
    email,
    officeName,
    phoneNumber,
    district,
    state,
    pincode,
    postMasterName,
    isAssigned: true,
  });
  const save = await dnkCentre.save();
  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  // generate 8digit password and send to email
  const password = generatePassword();
  // Encrypt the password
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
    role: "Post Master",
    id: dnkCentre._id,
  });

  const saveSuperAdmin = await superAdmin.save();
  if (!saveSuperAdmin) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(200).json({
    success: true,
    message: "Post Office registered successfully",
  });
};

export const registerCustomOffice = async (req, res, next) => {
  const { email, phoneNumber, district, state, pincode, officerName } =
    req.body;

  // Return error if customOffice exists
  const office = CustomsModel.find({ email });

  // if (office || office.length != 0) {
  //   return createError(req, res, next, "Custom office already exists.", 400);
  // }

  const customOffice = new CustomsModel({
    email,
    phoneNumber,
    district,
    state,
    pincode,
    isAssigned: true,
    officerName,
  });

  const save = await customOffice.save();
  if (!save) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }
  // generate 8digit password and send to email
  const password = generatePassword();
  // Encrypt the password
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
    role: "Custom Officer",
    id: customOffice._id,
  });

  const saveSuperAdmin = await superAdmin.save();
  if (!saveSuperAdmin) {
    return createError(req, res, next, "Failed to save in DB", 400);
  }

  res.status(200).json({
    success: true,
    message: "Custom officer registered successfully",
  });
};
