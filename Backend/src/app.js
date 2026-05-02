// app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import passport from "./config/passport.js";



import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/**
 *  BASIC MIDDLEWARE
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Auth API is running...");
});

/**
 *  AUTH ROUTES ONLY
 */
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

export default app;