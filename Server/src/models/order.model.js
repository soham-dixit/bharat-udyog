import mongoose from "mongoose";

const PlaceOrder = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  orderedBy: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
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
  exporterId: {
    type: String,
    required: true,
  },
  dnkCentreId: {
    type: String,
    default: "",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
});

const PlaceOrderModel = mongoose.model("Orders", PlaceOrder);

export default PlaceOrderModel;
