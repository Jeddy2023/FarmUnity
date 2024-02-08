import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";

dbConnect();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);

export default app;
