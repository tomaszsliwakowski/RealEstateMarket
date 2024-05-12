import express, { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";
const route: Router = express.Router();

route.get("/", getUsers);
route.get("/:id", verifyToken, getUser);
route.put("/:id", verifyToken, updateUser);
route.delete("/:id", verifyToken, deleteUser);

export default route;
