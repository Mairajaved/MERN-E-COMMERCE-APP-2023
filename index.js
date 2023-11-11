import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

// Get current filename
const __filename = fileURLToPath(import.meta.url);
// Get directory name
const __dirname = path.dirname(__filename);

// Configure env
dotenv.config();
// Database config
connectDB();

// Create express app
const app = express();

// Import REACT_APP_API from your .env file
const apiUrl = process.env.REACT_APP_API;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Port
const SERVER_PORT = process.env.SERVER_PORT || 8080;

// Run the server
app.listen(SERVER_PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${SERVER_PORT}`
  );
});
