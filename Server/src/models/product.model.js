import mongoose from "mongoose";

const Product = new mongoose.Schema({
  exporterId: {
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
  photoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableQty: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  festivals: {
    type: Array,
  },
  rating: {
    type: Number,
    default: 0.0,
    set: (value) => Math.round(value * 10) / 10,
    get: (value) => parseFloat(value.toFixed(1))
  },
  totalRatingCount: {
    type: Number,
    default: 0
  },
  ratingAddition: {
    type: Number,
    default: 0
  }
});

const ProductModel = mongoose.model("Product", Product);

export default ProductModel;
