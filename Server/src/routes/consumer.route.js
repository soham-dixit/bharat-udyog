
import { Router } from "express";
import {
  getConsumerData,
  registerConsumer,
  placeOrder,
  getConsumerOrder,
  getOrderStatus,
  addRating,
} from "../controllers/consumer.controller.js";

const router = Router();

router.post("/registerConsumer", registerConsumer);

router.get("/getConsumerData/:consumerId", getConsumerData);

router.post("/placeOrder", placeOrder);

router.get("/getConsumerOrder/:email", getConsumerOrder);

router.get("/getOrderStatus/:orderId", getOrderStatus);

router.put("/addRating/:productId/:ratingCount", addRating)

export default router;
