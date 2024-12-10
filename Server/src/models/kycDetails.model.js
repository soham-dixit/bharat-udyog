import mongoose from "mongoose";

const KycDetails = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  documentIssuedBy: {
    type: String,
    required: true,
  },
  dateOfIssue: {
    type: String,
    required: true,
  },
  documentUrl: {
    type: String,
    required: true,
  },
  exporterId: {
    type: String,
    required: true,
  },
});

const KycDetailsModel = mongoose.model("KycDetails", KycDetails);

export default KycDetailsModel;
