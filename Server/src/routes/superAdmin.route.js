import { Router } from "express";
import {
  registerCustomOffice,
  registerDnkCentre,
} from "../controllers/superAdmin.controller.js";

const router = Router();

router.post("/registerDnkCentre", registerDnkCentre);
router.post("/registerCustomOffice", registerCustomOffice);

export default router;
