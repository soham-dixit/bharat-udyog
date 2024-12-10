import multer from "multer";
import { storage } from "../utils/multerStorage.js";

export const upload = multer({ storage: storage });
