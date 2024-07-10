import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res, next) => {
    try {
        // Fetch all blogs and populate the user field
        const blogs = await Blog.find().populate("user");
        return res.status(200).json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
};
