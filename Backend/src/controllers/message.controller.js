import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import Tenant from "../models/tenant.model.js";
import {emitMessage} from "../config/socket.js";

/**
 SEND MESSAGE
 */
export const sendMessage = async (req, res) => {
  try {
    const { text, customerEmail } = req.body;

    if (!text || !customerEmail) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    //TEMP: assign default tenant 
    const tenant = await Tenant.findOne(); // first business

    if (!tenant) {
      return res.status(400).json({ msg: "No business found" });
    }

    // find or create conversation
    let conversation = await Conversation.findOne({
      customerEmail,
      tenantId: tenant._id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        customerEmail,
        tenantId: tenant._id,
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      sender: "customer",
      text,
    });

    // emit socket
    emitMessage(conversation._id, message);

    res.json({
      conversationId: conversation._id,
      message,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


/**
 GET ALL CONVERSATIONS (BUSINESS SIDE)
 */
export const getConversations = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const conversations = await Conversation.find({ tenantId })
      .sort({ updatedAt: -1 });

    res.json(conversations);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


/**
 GET MESSAGES OF A CONVERSATION
 */
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Message.find({
      conversationId: id
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


/**
 AGENT REPLY
 */
export const sendAgentReply = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    if (!conversationId || !text) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const message = await Message.create({
      conversationId,
      sender: "agent",
      text
    });

   emitMessage(conversationId, message);

    // update conversation time
    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: new Date()
    });

    res.status(201).json(message);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};