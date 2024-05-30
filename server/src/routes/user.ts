import express, { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePosts,
} from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";
const route: Router = express.Router();

route.get("/", getUsers);
route.get("/search/:id", verifyToken, getUser);
route.put("/:id", verifyToken, updateUser);
route.delete("/:id", verifyToken, deleteUser);
route.post("/save", verifyToken, savePost);
route.get("/profilePosts", verifyToken, profilePosts);

export default route;
