import express from "express";

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createFarmLandCtrl, deleteFarmLandCtrl, getAllFarmLandCtrl, getFarmLandCtrl } from "../controllers/farmLandController.js";
import upload from "../config/fileUpload.js";

const farmLandRoutes = express.Router();

farmLandRoutes.post("/", isLoggedIn, createFarmLandCtrl);
farmLandRoutes.get("/:id", getFarmLandCtrl);
farmLandRoutes.get("/", getAllFarmLandCtrl);
farmLandRoutes.delete("/:id",isLoggedIn, deleteFarmLandCtrl);

export default farmLandRoutes

