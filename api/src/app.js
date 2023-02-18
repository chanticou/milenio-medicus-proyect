const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//socket-io
const http = require("http");
const Server = require("socket.io");
//data base connection
require("./database/connection");
//dotenv
require("dotenv").config();
const routesUsers = require("./routes/users.routes.js");

const app = express();
const PORT = process.env.port || 4001;

const server = http.createServer(app);
const io = Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes
app.use(routesUsers);

//socket-io
io.on("connection", (socket) => {
  //Recibo del front el input
  socket.on("messageFromFront", (message) => {
    socket.broadcast.emit("messageFromBack", {
      from: socket.id,
      body: message,
    });
    let response;

    if (message === "hola") {
      response = "Hola, ¿en qué puedo ayudarte?";
    } else if (message === "ayuda") {
      response = "¿Necesitas ayuda? Por favor, dime en qué puedo ayudarte.";
    } else {
      response = "Lo siento, no entiendo lo que quieres decir.";
    }
    socket.emit("messageFromBack", { from: "backend", body: response });
  });
  //lo mando del back al front
  // socket.broadcast.emit("messageFromBack", message);
});

server.listen(PORT, () => console.log("Listening on port ", PORT));

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

// server.on("error", (error) => {
//   console.log("Socket.IO server error:", error);
// });
