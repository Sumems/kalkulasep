const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("calculate", (data) => {
    const { expression } = data;
    let result;
    try {
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, "");
      result = eval(sanitizedExpression);
    } catch (error) {
      result = "Invalid Expression";
    }
    socket.emit("result", result);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
