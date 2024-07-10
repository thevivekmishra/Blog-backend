import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/user.js"; 

export const addBlogs = async (req, res, next) => {
    const { title, description, image, user } = req.body;
  
    if (!title || !description || !image || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (error) {
      return res.status(500).json({ message: "Error finding user by ID" });
    }
  
    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user by ID" });
    }
  
    const blog = new Blog({
      title,
      description,
      image, // Ensure this property is set correctly
      user,
    });
  
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({ blog });
    } catch (error) {
      return res.status(500).json({ message: "Failed to save blog" });
    }
  };
  