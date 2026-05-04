import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// replace this later
const conversationId = "PUT_YOUR_CONVERSATION_ID";

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  socket.emit("join_conversation", conversationId);
});

socket.on("receive_message", (data) => {
  console.log("New Message:", data);
});