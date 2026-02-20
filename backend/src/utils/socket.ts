import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket, ExtendedError } from "socket.io";
import { verifyToken } from "./jwt";
import { ApiError } from "./ApiError";

let io: SocketIOServer;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      // credentials: true,
    },
  });

  io.use((socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new ApiError(401, "Authentication error"));
    }

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded!.id;
      next();
    } catch (error) {
      next(new ApiError(401, "Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId;

    // Join user's personal room
    socket.join(`user:${userId}`);

    console.log(`User ${userId} connected`);

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new ApiError(500, "Socket.io not initialized");
  }
  return io;
};

export const sendNotification = (userId: string, notification: any) => {
  if (io) {
    io.to(`user:${userId}`).emit("notification", notification);
  }
};
