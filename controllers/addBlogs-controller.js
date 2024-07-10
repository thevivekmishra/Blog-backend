import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const addBlogs = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "Unable to find user by ID" });
        }

        // Create new blog instance
        const blog = new Blog({
            title,
            description,
            image,
            user,
        });

        // Start a session and transaction for atomicity
        const session = await mongoose.startSession();
        session.startTransaction();

        // Save the new blog and update user's blogs array
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });

        // Commit transaction and close session
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ blog });
    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ message: "Failed to save blog", error: error.message });
    }
};
