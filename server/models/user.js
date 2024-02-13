import mongoose from "mongoose";
const schema = mongoose.Schema;

const UserSchema = new schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    wishLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList",
        },

    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookings",
        },

    ],
    farmland: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FarmLand",
        },
    ],
    equipment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },

    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);
export default User;