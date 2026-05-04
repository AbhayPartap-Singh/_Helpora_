import "dotenv/config";
import mongoose from "mongoose";
import http from "http";

import app from "./src/app.js";
import { initSocket } from "./src/config/socket.js";
import { verifyEmailConnection } from "./src/services/email.service.js";

// DB CONNECTION 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(" DB Connection Error:", error.message);
    process.exit(1);
  }
};

//  SERVER START
const startServer = async () => {
  try {
    await connectDB();

    await verifyEmailConnection();

    const PORT = process.env.PORT || 3000;

    // create HTTP server 
    const server = http.createServer(app);

    // initialize socket once
    initSocket(server);

    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();