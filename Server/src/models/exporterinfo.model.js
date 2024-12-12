import mongoose from "mongoose";

const ExporterInfo = new mongoose.Schema({
  exporterId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing
    ref: "exporters", // Name of the referenced model
    required: true,
  },
  aboutBusiness: {
    type: String,
    required: true,
  },
  aboutProducts: {
    type: String,
    required: true,
  },
  rangeSpecs: {
    type: String,
    required: true,
  },
});

const ExporterInfoModel = mongoose.model("exporterinfo", ExporterInfo);
export default ExporterInfoModel;
