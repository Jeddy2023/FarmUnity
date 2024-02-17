import { createReviewCtrl, deleteReviewCtrl, editReviewCtrl, getAllReviewCtrl, getSingleReviewCtrl } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import express from "express";


const reviewRoute = express.Router();

reviewRoute.post("/:id", isLoggedIn, createReviewCtrl);
reviewRoute.get("/", getAllReviewCtrl)
reviewRoute.get("/:id", getSingleReviewCtrl)
reviewRoute.delete("/:id", isLoggedIn, deleteReviewCtrl);
reviewRoute.put("/:id", isLoggedIn, editReviewCtrl);

export default reviewRoute;
