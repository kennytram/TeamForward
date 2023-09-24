require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const log = require("./helpers/logging");
// const passport = require("passport");
const app = express();
const socketio = require('socket.io')
const port = process.env.PORTKEY;
const ChatController = require("./controllers/messages.controller")

// configure Passport
// require("./Config/passport");

// middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.REDIRECTKEYTWO,
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

require("./Config/mongoose.config");
require("./routes/teamForward.routes")(app);

if (process.env.isProduction) {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const server = app.listen(port, () => console.log(`listening on port: ${port}`));

const io = socketio(server, {
  cors: {
    origin: process.env.REDIRECTKEYTWO,
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true,
  }
});

io.on("connection", async (socket) => {

  socket.on("join", (chatRoomId) => {
    socket.join(chatRoomId);
  });

  socket.on("clientMessage", (data) => {
    ChatController.createNewMessage(io, data);
  })
})
