import { Router } from "express";
import {
  addProduct,
  registerExporter,
  saveKycDetails,
  getAllOrders,
  getOrderDetails,
  getAllProducts,
  markForPickUp,
  getExporterDetails,
  verifyPin,
  getStatusOfAllOrders,
  getInvoiceDetails,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
  addDetails,
  getExporterInfo,
} from "../controllers/exporter.controller.js";
import { getUpcomingFestivals } from "../controllers/utils.controller.js";
// import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/registerExporter", registerExporter);

// router.post("/uploadKycDetails", upload.single("file"), saveKycDetails);
router.post("/uploadKycDetails", saveKycDetails);

// router.post("/addProduct", upload.single("file"), addProduct);
router.post("/addProduct", addProduct);

router.get("/getAllProducts/:exporterId", getAllProducts);

router.get("/getAllOrders/:exporterId", getAllOrders);

router.get("/getOrderDetails/:orderId", getOrderDetails);

router.put("/markForPickUp/:orderId", markForPickUp);

router.get("/getExporterDetails/:exporterId", getExporterDetails);

router.get("/verifyPin/:orderId/:pin", verifyPin);

router.get("/getStatusOfAllOrders/:exporterId", getStatusOfAllOrders);

router.get("/getInvoiceDetails/:orderId", getInvoiceDetails);

router.get("/getProductDetails/:productId", getProductDetails);

router.put("/updateProductDetails/:productId", updateProductDetails);

router.delete("/deleteProduct/:productId", deleteProduct);

router.post("/addDetails/:exporterId", addDetails);

router.get("/getExporterInfo/:exporterId", getExporterInfo);

export default router;
