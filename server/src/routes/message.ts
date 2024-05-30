import express, { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addMessage } from "../controllers/message";
const route: Router = express.Router();

route.get("/save", verifyToken, addMessage);

export default route;
