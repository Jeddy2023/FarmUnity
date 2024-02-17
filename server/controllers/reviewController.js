import Product from "../models/Product.js";
import Review from "../models/Review.js";
import asyncHandler from "express-async-handler";

export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating, product } = req.body;

  const { productId } = req.params;
  const productFound = await Product.findById(productId).populate("reviews");

  if (!productFound) {
    throw new Error("Product not found");
  }
  //check if user has review same product

  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req.userAuth?.toString();
  });
  // console.log(hasReviewed);
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
    // console.log("already reviewed");
  }

  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuth,
  });

  productFound.reviews.push(review?._id);
  await productFound.save();

  res.status(201).json({
    status: "success",
    message: "review created successfully",
  });
});

//get a single review
export const getReviewCtrl = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

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
});

//get all review

export const listReviewCtrl = asyncHandler(async (req, res) => {
  const review = await Review.find();
  res.status(200).json({
    status: "success",
    review,
  });
});

//delete a review
export const deleteRemoveCtrl = asyncHandler(async (req, res) => {
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
  const { message, rating } = req.body;

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
      message,
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