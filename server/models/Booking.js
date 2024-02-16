import mongoose from "mongoose";
const schema = mongoose.Schema;

const BookingSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resourceType: { type: String, enum: ['Equipment', 'Farmland'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    totalpay: {
        type: Number,
        default: 0.0
    },
},
    {
        timestamps: true
    }
)

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;