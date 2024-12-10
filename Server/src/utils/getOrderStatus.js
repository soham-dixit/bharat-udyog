import OrderStatusModel from "../models/orderStatus.model.js";

export const getOrderStatusForOrder = async (orderId) => {
  // Fetch the order status from OrderStatusModel
  const orderStatus = await OrderStatusModel.findOne({ orderId });

  if (!orderStatus) {
    return {
      success: false,
      message: "Order status not found",
      status: "Pending",
    };
  }

  // Determine the current status based on the specified conditions
  let status = "Pending";

  if (orderStatus.isReadyToShip) {
    if (orderStatus.isPostmanAssigned) {
      if (orderStatus.isPickedUp) {
        if (orderStatus.isDroppedAtDnk) {
          if (orderStatus.isVerifiedByDnk) {
            if (orderStatus.isShippedByCustom) {
              if (orderStatus.isVerifiedByCustom) {
                if (orderStatus.isDispatched) {
                  status = "Order Completed";
                } else {
                  status = "Verified by Customs";
                }
              } else {
                status = "Shipped to Customs";
              }
            } else {
              status = "Verified by Post Office";
            }
          } else {
            status = "Under Post Office Verification";
          }
        } else {
          status = "Picked up by Postman";
        }
      } else {
        status = "Ready for Pickup";
      }
    } else {
      status = "Postman not assigned";
    }
  }

  return {
    success: true,
    message: "Order status fetched",
    status,
  };
};

export const determineOrderStatus = (orderStatus) => {
  if (!orderStatus) {
    return "No status available";
  }

  if (orderStatus.isDispatched) {
    return "Order Completed";
  } else if (orderStatus.isVerifiedByCustom) {
    return "Verified by Customs";
  } else if (orderStatus.isShippedByCustom) {
    return "Shipped to Customs";
  } else if (orderStatus.isVerifiedByDnk) {
    return "Verified by Post Office";
  } else if (orderStatus.isDroppedAtDnk) {
    return "Under Post Office Verification";
  } else if (orderStatus.isPickedUp) {
    return "Picked up by Postman";
  } else if (orderStatus.isPostmanAssigned) {
    return "Ready for Pickup";
  } else if (orderStatus.isReadyToShip) {
    return "Postman not assigned";
  }

  return "No status available";
};
