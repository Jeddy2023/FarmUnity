import mongoose from "mongoose";
const schema = mongoose.Schema;

const EquipmentSchema = new schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    specifications: { type: String, required: true },
    operatingInstructions: { type: String, required: true },
    safetyPrecautions: { type: String, required: true },
    maintenanceRequirements: { type: String, required: true },
    rentalterms: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
        enum: ['Upfront', 'Monthly','Weekly','Open for Consideration'],
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
})

const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;