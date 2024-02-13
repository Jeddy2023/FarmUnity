import asyncHandler from "express-async-handler";
import FarmLand from "../models/FarmLand.js";
import User from "../models/User.js";

export const createFarmLandCtrl = asyncHandler(async (req, res) => {
    const {
        description,
        size,
        location,
        price,
        rentalterms,
        images,
        paymentSchedule
    } = req.body;

    const user = await User.findById(req.userAuth);
    console.log(user)

    // myImages = req.files.map((file) => file.path);

    if (!location || !size || !paymentSchedule || !description || !price || !rentalterms) {
        throw new Error(`Description, Location, size, price, rentalterms and payment schedule are required.`)
    }

    const createFarmLand = await FarmLand.create({
        user: user._id,
        description,
        size,
        location,
        price,
        rentalterms,
        images,
        paymentSchedule
    });

    user.farmland.push(createFarmLand._id);
    await user.save();

    res.status(201).json({
        status: "success",
        message: "FarmLand created successfully",
        createFarmLand,
    });
});

export const getFarmLandCtrl = asyncHandler(async (req, res) => {
    const farmLandFound = await FarmLand.findById(req.params.id);

    if (!farmLandFound) {
        throw new Error("No product found ");
    }
    res.json({
        status: "success",
        message: "Product found",
        farmLandFound,
    });
});

export const getAllFarmLandCtrl = asyncHandler(async (req, res) => {
    const farmLands = await FarmLand.find();

    res.json({
        status: "success",
        message: "Product found",
        farmLands,
    });
});

export const deleteFarmLandCtrl = asyncHandler(async (req, res) => {
    const farmland = await FarmLand.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.userAuth);
    if (!farmland) {
        throw new Error("Something went wrong");
    }

    // Find index of farmland in user's array and remove it
    const index = user.farmland.indexOf(req.params.id);
    if (index > -1) {
        user.farmland.splice(index, 1);
    }

    // Save the user after removing the farmland from the array
    await user.save();

    res.json({
        status: "success",
        message: "Product deleted successfully",
    });
})

export const editFarmLandCtrl = asyncHandler(async (req, res) => {
    const {
        description,
        size,
        location,
        price,
        rentalterms,
        images,
        paymentSchedule
    } = req.body;

    const farmLandFound = await FarmLand.findById(req.params.id);

    if (!farmLandFound) {
        throw new Error("No prouduct with such an Id");
    }
    const farmLand = await FarmLand.findByIdAndUpdate(
        req.params.id,
        {
            description,
            size,
            location,
            price,
            rentalterms,
            images,
            paymentSchedule
        },
        {
            new: true,
        }
    );

    res.json({
        status: "success",
        message: "Equipment edited successfully",
        farmLand,
    });
});