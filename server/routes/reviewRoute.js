import { createReviewCtrl } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import express from "express";


const reviewRoute = express.Router();

reviewRoute.post("/:productId", createReviewCtrl);

export default reviewRoute;
