import mongoose from "mongoose";
const schema = mongoose.Schema;

const FarmLandSchema = new schema({
    description: {
        type: String,
        required: true
    },
    rentalterms: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Farmland must belong to a users"],
    },
    price: {
        type: Number,
        required: true,
    },
    images: [
        {
            type: String,
            required: true
        },
    ],
    paymentSchedule: {
        type: String,
        enum: ['Upfront', 'Monthly', 'Weekly', 'Open for Consideration'],
        default: 'Upfront'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    status: {
        type: String,
        default: "available",
        enum: ["available", "Not available"]
    },
},
    {
        timestamps: true
    })

const FarmLand = mongoose.model("FarmLand", FarmLandSchema);
export default FarmLand;