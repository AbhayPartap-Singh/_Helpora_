import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(" Joined room:", conversationId);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });
};

export const emitMessage = (conversationId, message) => {
  if (!io) {
    console.log(" Socket not initialized");
    return;
  }

  io.to(conversationId).emit("receive_message", message);
};