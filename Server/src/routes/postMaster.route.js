import { Router } from "express";
import {
  addPostMan,
  getExporterKycDetails,
  registerPostMaster,
  getRegisteredExporters,
  getPendingExporters,
  verifyExporter,
  assignPostman,
  verifyOrder,
  getAllOrders,
  rejectExporter,
  getRegisteredPostman,
  getPostman,
  shipToCustom,
} from "../controllers/postMaster.controller.js";

const router = Router();

router.post("/registerPostMaster", registerPostMaster);

router.post("/addPostman", addPostMan);

router.get("/getAllOrders/:email", getAllOrders);

router.get("/getExporterKycDetails/:exporterId", getExporterKycDetails);

router.get("/getRegisteredExporters/:emailId", getRegisteredExporters);

router.get("/getPendingExporters/:emailId", getPendingExporters);

router.put("/verifyExporter/:exporterId", verifyExporter);

router.get("/assignPostmanToOrder/:orderId/:email", assignPostman);

router.put("/verifyOrder/:orderId", verifyOrder);

router.put("/rejectExporter/:exporterId", rejectExporter);

router.get("/getRegisteredPostman/:dnkCentreId", getRegisteredPostman);

router.get("/getPostman/:dnkcentreId", getPostman);

router.put("/shipToCustom/:orderId", shipToCustom)

export default router;
