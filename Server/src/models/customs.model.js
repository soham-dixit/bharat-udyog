import mongoose from "mongoose";

const Customs = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  officerName: {
    type: String,
    default: "",
  },
});

const CustomsModel = mongoose.model("Customsoffices", Customs);

export default CustomsModel;
