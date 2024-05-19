import express, { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/post";
const route: Router = express.Router();

route.get("/", getPosts);
route.get("/:id", getPost);
route.post("/", verifyToken, addPost);
route.put("/:id", verifyToken, updatePost);
route.delete("/:id", verifyToken, deletePost);

export default route;
