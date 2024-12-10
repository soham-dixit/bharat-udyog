// Importing all packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

import swaggerUi from "swagger-ui-express";
// import swaggerFile from "../swagger_output.json" assert { type: "json" };
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const swaggerFile = require("../swagger_output.json");
import router from "./routes/auth.route.js";

// Import db connection
import connectDB from "./utils/db.js";
import errorHandler from "./middlewares/errorHandler.js";

// Importing all routes
import superAdminRoute from "./routes/superAdmin.route.js";
import postMasterRoute from "./routes/postMaster.route.js";
import customOfficerRoute from "./routes/customOfficer.route.js";
import postmanRoute from "./routes/postman.route.js";
import exporterRoute from "./routes/exporter.route.js";
import consumerRoute from "./routes/consumer.route.js";
import utilsRouter from "./routes/utils.route.js";

import detailsRoute from "./routes/details.route.js";
import authRoute from "./routes/auth.route.js";
import MasterLoginModel from "./models/masterLogin.model.js";

// Configure environment variables
dotenv.config();

// Declaring globals
export const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// var cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://bharatudyog.vercel.app"
    ],
  })
);

// Connecting to DB
connectDB();

// // Declaring middlewares
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://localhost:8000",
//     ],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.send("BharatUdyog Server."));

app.use("/api/v4/superAdmin", superAdminRoute);
app.use("/api/v4/postMaster", postMasterRoute);
app.use("/api/v4/customOfficer", customOfficerRoute);
app.use("/api/v4/postman", postmanRoute);
app.use("/api/v4/exporter", exporterRoute);
app.use("/api/v4/consumer", consumerRoute);
app.use("/api/v4/details", detailsRoute);
app.use("/api/v4/auth", authRoute);
app.use("/api/v4/utils", utilsRouter);

app.get("/register", async (req, res) => {
  // Encrypt the password
  const password = "arpit@123";
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new MasterLoginModel({
    email: "admin@gmail.com",
    password: hashPassword,
    role: "Admin",
    id: "123456",
  });
  await user.save();
  res.status(200).json({ success: true });
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
