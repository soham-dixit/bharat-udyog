import mongoose from "mongoose";

const OrderStatus = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  isReadyToShip: {
    type: Boolean,
    default: false,
  },
  isPostmanAssigned: {
    type: Boolean,
    default: false,
  },
  assignedPostman: {
    type: String,
    default: "",
  },
  isVerifiedByDnk: {
    type: Boolean,
    default: false,
  },
  isPickedUp: {
    type: Boolean,
    default: false,
  },
  isDroppedAtDnk: {
    type: Boolean,
    default: false,
  },
  isShippedToCustom: {
    type: Boolean,
    default: false,
  },
  isVerifiedByCustom: {
    type: Boolean,
    default: false,
  },
  isDispatched: {
    type: Boolean,
    default: false,
  },
  isShippedByCustom: {
    type: Boolean,
    defaut: false,
  },
  /////// Dates //////
  isDispatchedDate: {
    type: Date,
    default: null,
  },
  isPickedUpDate: {
    type: Date,
    default: null,
  },
  readyToShipDate: {
    type: Date,
    default: null,
  },
  postmanAssignDate: {
    type: Date,
    default: null,
  },
  dnkVerifiedDate: {
    type: Date,
    default: null,
  },
  customVerifiedDate: {
    type: Date,
    default: null,
  },
  isShipToCustomDate: {
    type: Date,
    default: null,
  },
  isDroppedAtDnkDate: {
    type: Date,
    default: null,
  },
});

const OrderStatusModel = mongoose.model("OrderStatus", OrderStatus);

export default OrderStatusModel;
