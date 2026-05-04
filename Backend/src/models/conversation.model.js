import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open"
    },

    mode: {
      type: String,
      enum: ["ai", "human"],
      default: "ai"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);