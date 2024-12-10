import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  operationalCountries: {
    type: Array,
    default: "",
  },
});

const Data = mongoose.model("data", dataSchema);
export default Data;
