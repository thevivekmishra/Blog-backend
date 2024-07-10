import Blog from "../models/Blog.js";

export const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Find blog by ID and return it
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ blog });
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        return res.status(500).json({ message: "Failed to fetch blog", error: error.message });
    }
};
