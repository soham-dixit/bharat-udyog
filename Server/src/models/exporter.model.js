import mongoose from "mongoose";

const Exporter = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isDenied: {
    type: Boolean,
    defaut: false,
  },
  isKycSubmitted: {
    type: Boolean,
    default: false,
  },
  // latitude: {
  //   type: String,
  //   required: true,
  // },
  // longitude: {
  //   type: String,
  //   required: true,
  // },
});

const ExporterModel = mongoose.model("Exporter", Exporter);

export default ExporterModel;
