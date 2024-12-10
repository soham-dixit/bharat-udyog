import mongoose from "mongoose";

const PostMan = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  latitude: {
    type: String,
    default: "",
  },
  longitude: {
    type: String,
    default: "",
  },
});

const PostManModel = mongoose.model("PostMan", PostMan);

export default PostManModel;
