import { Router } from "express";
import {
  getPostmanData,
  registerPostman,
  getPostmanOrders,
  getOrderDetails,
  dropAtDnkCentre,
} from "../controllers/postman.controller.js";

const router = Router();

router.post("/registerPostman", registerPostman);
router.get("/getPostmanData/:postmanId", getPostmanData);
router.get("/getPostmanOrders/:emailId", getPostmanOrders);
router.get("/getOrderDetails/:orderId", getOrderDetails);
router.put("/dropAtDnkCentre/:orderId", dropAtDnkCentre);

export default router;
