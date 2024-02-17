import asyncHandler from "express-async-handler";
import FarmLand from "../models/FarmLand.js";
import Equipment from "../models/Equipment.js";
import User from "../models/User.js";
import Review from "../models/Review.js";

export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { rating, reviewText, item } = req.body;

  const { productId } = req.params;
  const productFound = await FarmLand.findById(productId).populate("reviews") ? await FarmLand.findById(productId).populate("reviews") : await Equipment.findById(productId).populate("reviews");

  if (!productFound) {
    throw new Error("Product not found")
  }

  if(productFound.user.toString() === req.userAuth.toString()){
    throw new Error("You cannot review your product");
  }

  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req.userAuth?.toString();
  });

  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }

  const review = await Review.create({
    reviewText,
    rating,
    item: productFound?._id,
    user: req.userAuth,
  });

  productFound.reviews.push(review._id);
  await productFound.save();

  const productOwnerId = productFound.user;
  const findOwner = await User.findById(productOwnerId);
  findOwner.reviews.push(review._id);
  await findOwner.save();

  res.status(201).json({
    status: "success",
    message: "review created successfully",
    review,
  });

});

export const getAllReviewCtrl = asyncHandler(async (req, res) => {
  const review = await Review.find();

  res.status(200).json({
    status: "success",
    review,
  });
})

export const getSingleReviewCtrl = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  console.log(review)

  if (!review) {
    return res.status(404).json({
      status: "fail",
      message: "review not found",
    });
  }

  res.status(200).json({
    status: "success",
    review,
  });
})

export const deleteReviewCtrl = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    throw new Error("Something went wrong. Try again later!");
  }
  res.status(200).json({
    status: "success",
    message: "review deleted successfully",
  });
});

// Update review
export const editReviewCtrl = asyncHandler(async (req, res) => {
  const { reviewText, rating } = req.body;

  // Find the review by ID
  const review = await Review.findById(req.params.id);

  // Check if the review exists
  if (!review) {
    return res.status(404).json({
      status: "fail",
      message: "Review not found.",
    });
  }

  // Check if the review belongs to the authenticated user
  if (review.user.toString() !== req?.userAuth?.toString()) {
    return res.status(403).json({
      status: "fail",
      message: "Access denied. You can't update a review that was not created by you.",
    });
  }

  // Update the review
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    {
      reviewText,
      rating,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: updatedReview,
  });
});