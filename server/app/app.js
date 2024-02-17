import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import farmLandRoutes from "../routes/farmLandRoute.js";
import { globalError, notFound } from "../middleware/globalErroHandler.js";
import equipmentRoutes from "../routes/equipmentRoute.js";
import reviewRoute from "../routes/reviewRoute.js";

dbConnect();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/farmlands", farmLandRoutes)
app.use("/api/v1/equipments", equipmentRoutes)
app.use("/api/v1/reviews", reviewRoute)
app.use(notFound)
app.use(globalError)

export default app;
