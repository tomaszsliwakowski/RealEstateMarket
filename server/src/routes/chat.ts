import express, { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getChats, getChat, addChat, readChat } from "../controllers/chat";
const route: Router = express.Router();

route.get("/", verifyToken, getChats);
route.get("/:id", verifyToken, getChat);
route.post("/", verifyToken, addChat);
route.get("/read/:id", verifyToken, readChat);

export default route;
