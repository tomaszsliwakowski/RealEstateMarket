import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import postRoute from "./routes/post";
import chatRoute from "./routes/chat";
import messageRoute from "./routes/message";
import { Server } from "socket.io";
import { addUser, getUser, removeUser } from "../socket/socket";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server On");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});

const io = new Server({
  cors: {
    origin: "http://localhost:6000",
  },
});

io.on("connection", (socket) => {
  socket.on("test", (data) => {
    console.log(data);
  });

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
