import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  //  Who created this tenant (owner)
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //  ACCOUNT STATUS (important for SaaS)
  isActive: {
    type: Boolean,
    default: true
  },

  //  OPTIONAL INFO (useful later)
  email: {
    type: String,
    lowercase: true,
    trim: true
  },

  //  TRACKING
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("Tenant", TenantSchema);