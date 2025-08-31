import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/request", requestRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err.message));

// --- Socket.IO Setup ---
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow frontend (change to Vercel URL after deploy)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // ✅ FIX: always forward the original senderId & senderName
  socket.on("sendMessage", (msgObj) => {
    const fullMsg = {
      message: msgObj.message,
      senderId: msgObj.senderId,       // Alice’s or Bob’s real ID
      senderName: msgObj.senderName,   // Alice or Bob
      createdAt: new Date().toISOString(),
    };
    io.to(msgObj.roomId).emit("receiveMessage", fullMsg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// --- Server Start ---
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
