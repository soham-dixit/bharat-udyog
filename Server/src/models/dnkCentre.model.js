import mongoose from "mongoose";

const DnkCentre = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  officeName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
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
  postMasterName: {
    type: String,
    default: "",
  },
  postManIds: {
    type: Array,
    default: [],
  },
});

const DnkCentreModel = mongoose.model("PostOffice", DnkCentre);

export default DnkCentreModel;
