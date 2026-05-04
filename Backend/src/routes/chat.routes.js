import express from "express";
import {
  sendMessage,
  getConversations,
  getMessages,
  sendAgentReply
} from "../controllers/message.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/message", sendMessage);
router.post("/reply", protect, sendAgentReply);

router.get("/conversations", protect, getConversations);
router.get("/messages/:id", protect, getMessages);

export default router;