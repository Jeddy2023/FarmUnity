import Review from "../models/Review.js";
import asyncHandler from "express-async-handler";
import FarmLand from "../models/FarmLand.js";
import Equipment from "../models/Equipment.js";

export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const productFound = await FarmLand.findById(productId) 
  const foundItem = productFound ? await FarmLand.findById(productId) : await Equipment.findById(productId);

  if (!foundItem) {
    return res.status(404).json({
      status: "fail",
      message: "Item not found",
    });
  }

  res.status(201).json({
    status: "success",
    message: "review created successfully",
    foundItem,
  });

});
