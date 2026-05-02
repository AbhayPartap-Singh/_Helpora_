import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    minlength: 6,
    required: function () {
      return this.authProvider === "local"; // only required for email/password
    }
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  role: {
    type: String,
    enum: ["owner", "agent"],
    default: "owner"
  },

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
    index: true
  },

  // verification
  isVerified: {
    type: Boolean,
    default: false
  },

  verifiedAt: Date,

  // account control
  isActive: {
    type: Boolean,
    default: true
  },

  // tracking
  lastLogin: Date

}, { timestamps: true });

export default mongoose.model("User", UserSchema);