import express, { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
} from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";
const route: Router = express.Router();

route.get("/", getUsers);
route.get("/:id", verifyToken, getUser);
route.put("/:id", verifyToken, updateUser);
route.delete("/:id", verifyToken, deleteUser);
route.post("/save", verifyToken, savePost);

export default route;
