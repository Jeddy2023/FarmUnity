import mongoose from "mongoose";

const schema = mongoose.Schema;

const ReviewSchema = new schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  item: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String, required: true },
},

  { timestamps: true, toJSON: { virtuals: true } }
);
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
