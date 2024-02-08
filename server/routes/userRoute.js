import express from "express";
import { loginUserContrl, registerUserContrl } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserContrl);
userRoutes.post("/login", loginUserContrl);

export default userRoutes;