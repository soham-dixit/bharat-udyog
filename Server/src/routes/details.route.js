import { Router } from "express";
import {
  getAllCustomOffices,
  getAllDnkCentre,
  getDnkCentreDetails,
  getAllProducts,
  getOrderStatus,
  updateOperationalCountries,
  fetchOperationalCountries,
} from "../controllers/details.controller.js";

const router = Router();

router.get("/getDnkCentreDetails/:pincode", getDnkCentreDetails);

router.get("/getAllDnkCentre", getAllDnkCentre);

router.get("/getAllCustomOffices", getAllCustomOffices);

router.get("/getAllProducts", getAllProducts);

router.get("/getOrderStatus/:orderId", getOrderStatus);

router.post("/addOperationalCountries", updateOperationalCountries);

router.get("/fetchOperationalCountries", fetchOperationalCountries);

export default router;