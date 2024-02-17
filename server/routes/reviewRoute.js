import { isLoggedIn } from "../middleware/isLoggedIn.js";
import express from "express";
import {
  createReviewCtrl,
  getReviewCtrl,
  listReviewCtrl,
} from "../controllers/reviewController.js";

const reviewRoute = express.Router();

reviewRoute.post("/:productId", isLoggedIn, createReviewCtrl);
reviewRoute.get("/:id", getReviewCtrl);
reviewRoute.get("/", listReviewCtrl);

export default reviewRoute;
