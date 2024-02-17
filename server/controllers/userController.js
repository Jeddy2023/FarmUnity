import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler"
import generateToken from "../util/generateToken.js";

// Controller to handle registering a user
export const registerUserContrl = asyncHandler(async (req, res) => {
    const { fullName, email, password, phone } = req.body;

    // Validate user input
    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is in correct format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address format" });
    }

    try {
        // Check if user already exists
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user. Please try again later." });
    }
});

// Controller to handle user login
export const loginUserContrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
})

// Controller to get logged in user
export const userProfile = asyncHandler(async (req, res) => {
    const userFound = await User.findById(req.userAuth).populate([
        { path: "farmland" },
        { path: "equipment" },
        { path: "reviews" }
    ]);

    res.json({
        status: "success",
        message: "User profile fetched successfully",
        userFound
    });
});