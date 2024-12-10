import mongoose from "mongoose";

const MasterLogin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
});

const MasterLoginModel = mongoose.model("MasterLogin", MasterLogin);

export default MasterLoginModel;
