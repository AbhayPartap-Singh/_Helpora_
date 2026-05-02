import mongoose from "mongoose";
const OTPSchema = new mongoose.Schema({
  email: String,

  otp: String, // hashed

  expiresAt: Date,

  attempts: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("OTP", OTPSchema);