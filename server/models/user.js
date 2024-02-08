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
            type: mongoose.Schema.ObjectId,
            ref: "WishList",
        },

    ],
    bookings: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Bookings",
        },

    ],
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Products",
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