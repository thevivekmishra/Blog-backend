import Blog from "../models/Blog.js";

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Find blog by ID and populate the user field
        const blog = await Blog.findByIdAndDelete(id).populate("user");

        // Remove the blog from user's blogs array
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }
};
