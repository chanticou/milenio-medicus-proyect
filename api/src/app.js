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
    from: "Milenio",
    message:
      "¡Hola bienvenid@! ¿En qué puedo ayudarte?, marca la option deseada:",
    options: [
      "Opcion 1:Consultorio online",
      "Opcion 2: Sintomas covid",
      "Opcion 3: Recetas online",
    ],
  };

  //APENAS EMPEIZA LA PAGINA, ESCUCHO EL MENSAJE DEL USUARIO, QUE VA A SER EN EL SUEEFFECT INICIO Y DEVUELVO LA SOPTIONES PREDETEMRINADAS.
  socket.on("firstMessageOptions", (message) => {
    if (/inicio+/i.test(message)) {
      socket.emit("firstMessageOptionsBackend", response);
    }

    //ELEGIR LA OPCION DESEADS POR EL CLIENTE
    socket.on("selectOptionFromUser", (message) => {
      if (message == "Opcion 1:Consultorio online") {
        socket.emit("responseOptionFromServer", {
          from: "Milenio",
          message:
            "A continuacion te pasamos el link para que pidas turno!   'LINK'. !Muchas gracias!",
          options: [],
        });
      }
      if (message == "Opcion 2: Sintomas covid") {
        socket.emit("responseOptionFromServer", {
          from: "Milenio",
          message:
            "Por favor, ingresa en el siguiente LINK y podras acceder a la brevedad a un medico online.",
          options: [],
        });
      }
      if (message == "Opcion 3: Recetas online") {
        socket.emit("responseOptionFromServer", {
          from: "Milenio",
          message:
            "Por favor, ingresa en el siguiente LINK, ingresa tus sintomas y te redirigiremos..",
          options: [],
        });
      } else {
        socket.emit("responseOptionFromServer", {
          from: "Milenio",
          message: "Por favor, vuelve a intentarlo",
          options: [],
        });
      }
    });
    //

    //AHORA SI EL USUARIO INTENTA OCMUNICARSE CON EL SERVIDOR, QUE RESPONDEMOS?
    let response2 = {
      from: "Milenio",
      message: "¡Hola de nuevo! Por favor marca la opcion deseada:",
      options: [
        "Opcion 1:Consultorio online",
        "Opcion 2: Sintomas covid",
        "Opcion 3: Recetas online",
      ],
    };
    socket.on("userMessage", (message) => {
      console.log(message);
      socket.emit("prueba", message);
    });
    socket.on("userMessage", (message) => {
      console.log(message);
      socket.emit("responseUserMessage", response2);
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
