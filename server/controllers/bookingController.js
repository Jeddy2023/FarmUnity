import asyncHandler from "express-async-handler";
import Booking from "../models/Booking";
import User from "../models/User";

export const createBookingCtrl = asyncHandler(async (req, res) => {
    const { resourceId, resourceType, startDate, endDate, status } = req.body;
    const user = await User.findById(req.userAuth);

    if (!resourceId || !resourceType || !startDate || !endDate) {
        throw new Error('Missing required fields.')
    }

    const createBooking = await Booking.create({
        user: user._id,
        resourceId,
        resourceType,
        startDate,
        endDate,
        totalPay,
        status
    });

    user.bookings.push(createBooking._id);
    await user.save();

    res.status(201).json({
        status: "success",
        message: "Booking created successfully",
        createBooking,
    });

})