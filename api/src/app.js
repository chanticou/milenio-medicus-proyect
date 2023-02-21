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
  let response = {
    message:
      "¡Hola bienvenid@! ¿En qué puedo ayudarte?, marca la option deseada:",
    options: [
      "Opcion 1:Consultorio online",
      "Opcion 2: Sintomas covid",
      "Opcion 3: Recetas online",
    ],
  };
  let response2 = {
    from: "User",
    message: { messages: "¡Hola de nuevo! Por favor marca la opcion deseada:" },
    options: [
      "Opcion 1:Consultorio online",
      "Opcion 2: Sintomas covid",
      "Opcion 3: Recetas online",
    ],
  };
  socket.on("messageFromFront", (message) => {
    if (/inicio+/i.test(message)) {
      response;
    }

    socket.on("userMessage", (message) => {
      if (/hola+/i.test(message)) {
        socket.emit("responsemachine", response2);
      }
    });
    socket.emit("messageFromBack", {
      from: "Milenio",
      message: response,
      options: [""],
    });

    socket.on("buttonMessage", (message) => {
      console.log(message);
      if (message == "Opcion 1:Consultorio online") {
        socket.emit("responseButtonsMessage", {
          from: "Milenio",
          message: {
            message:
              "A continuacion te pasamos el link para que pidas turno!   'LINK'. !Muchas gracias!",
          },
          options: [""],
        });
      }
      if (message == "Opcion 2: Sintomas covid") {
        socket.emit("responseButtonsMessage", {
          from: "Milenio",
          message: {
            message:
              "Por favor, ingresa en el siguiente LINK y podras acceder a la brevedad a un medico online.",
          },
          options: [""],
        });
      }
      if (message == "Opcion 3: Recetas online") {
        socket.emit("responseButtonsMessage", {
          from: "Milenio",
          message: {
            message:
              "Por favor, ingresa en el siguiente LINK, ingresa tus sintomas y te redirigiremos..",
          },
          options: [""],
        });
      } else {
        socket.emit("responseButtonsMessage", {
          from: "Milenio",
          message: { message: "Por favor, vuelve a intentarlo" },
          options: [""],
        });
      }
    });

    //llega el mensaje del fornt y lo devuelvo con el id del user.
    // socket.emit("messageFromBack", {
    //   from: socket.id,
    //   body: message,
    //   options: "",
    // });
  });
  //lo mando del back al front
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
