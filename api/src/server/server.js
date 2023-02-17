// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("user-message", (message) => {
//     console.log("User message:", message);
//     // Aquí podrías procesar la pregunta y obtener una respuesta
//     // Luego, envías la respuesta de vuelta al cliente
//     socket.emit("bot-message", "Esta es la respuesta a tu pregunta.");
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// server.listen(5000, () => {
//   console.log("Server listening on port 5000");
// });
