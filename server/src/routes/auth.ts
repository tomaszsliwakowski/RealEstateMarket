import express, { Router } from "express";
import { login, logout, register } from "../controllers/auth";
const route: Router = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

export default route;
