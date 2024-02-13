import express from "express";

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import { createEquipmentCtrl, deleteEquipmentCtrl, editEquipmentCtrl, getAllEquipmentCtrl, getEquipmentCtrl } from "../controllers/equipmentController.js";

const equipmentRoutes = express.Router();

equipmentRoutes.post("/", isLoggedIn, createEquipmentCtrl);
equipmentRoutes.get("/:id", getEquipmentCtrl);
equipmentRoutes.get("/", getAllEquipmentCtrl);
equipmentRoutes.delete("/:id",isLoggedIn, deleteEquipmentCtrl);
equipmentRoutes.put("/:id",isLoggedIn, editEquipmentCtrl);

export default equipmentRoutes

