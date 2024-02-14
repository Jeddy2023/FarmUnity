import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Equipment from "../models/Equipment.js";

export const createEquipmentCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        type,
        specifications,
        operatingInstructions,
        safetyPrecautions,
        maintenanceRequirements,
        rentalterms,
        price,
        paymentSchedule,
        images
    } = req.body;

    const user = await User.findById(req.userAuth);

    const myImages = req.files.map((file) => file.path);

    if (!name || !type || !paymentSchedule || !specifications || !price || !rentalterms || !operatingInstructions || !safetyPrecautions || !maintenanceRequirements ) {
        throw new Error(`All fields are required.`)
    }

    const createEquipment = await Equipment.create({
        user: user._id,
        name,
        type,
        specifications,
        operatingInstructions,
        safetyPrecautions,
        maintenanceRequirements,
        rentalterms,
        price,
        paymentSchedule,
        images: myImages,
    });

    user.equipment.push(createEquipment._id);
    await user.save();

    res.status(201).json({
        status: "success",
        message: "Equipment created successfully",
        createEquipment,
    });
});

export const getEquipmentCtrl = asyncHandler(async (req, res) => {
    const equipmentFound = await Equipment.findById(req.params.id);

    if (!equipmentFound) {
        throw new Error("No product found ");
    }
    res.json({
        status: "success",
        message: "Product found",
        equipmentFound,
    });
});

export const getAllEquipmentCtrl = asyncHandler(async (req, res) => {
    const equipments = await Equipment.find();

    res.json({
        status: "success",
        message: "Product found",
        equipments,
    });
});

export const deleteEquipmentCtrl = asyncHandler(async (req, res) => {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.userAuth);
    if (!equipment) {
        throw new Error("Something went wrong");
    }

    // Find index of farmland in user's array and remove it
    const index = user.equipment.indexOf(req.params.id);
    if (index > -1) {
        user.equipment.splice(index, 1);
    }

    // Save the user after removing the farmland from the array
    await user.save();

    res.json({
        status: "success",
        message: "Equipment deleted successfully",
    });
})

export const editEquipmentCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        type,
        specifications,
        operatingInstructions,
        safetyPrecautions,
        maintenanceRequirements,
        rentalterms,
        price,
        paymentSchedule
    } = req.body;

    const equipmentFound = await Equipment.findById(req.params.id);

    if (!equipmentFound) {
        throw new Error("No prouduct with such an Id");
    }
    const equipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        {
            name,
            type,
            specifications,
            operatingInstructions,
            safetyPrecautions,
            maintenanceRequirements,
            rentalterms,
            price,
            paymentSchedule
        },
        {
            new: true,
        }
    );

    res.json({
        status: "success",
        message: "Equipment edited successfully",
        equipment,
    });
});