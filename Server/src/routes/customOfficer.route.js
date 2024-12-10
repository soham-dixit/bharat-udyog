import { Router } from "express";
import {
  registerCustomOfficer,
  getOrders,
  verifyOrder,
} from "../controllers/customOfficer.controller.js";

const router = Router();

router.post("/registerCustomofficer", registerCustomOfficer);

router.get("/getOrders/:officerId", getOrders);

router.put("/verifyOrder/:orderId", verifyOrder);

export default router;
