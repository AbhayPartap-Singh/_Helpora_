import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";
import { verifyEmailConnection } from "./src/services/email.service.js";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

const startServer = async () => {
  await connectDB();
  await verifyEmailConnection();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();