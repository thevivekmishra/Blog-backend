import Blog from "../models/Blog.js";

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save();
    } catch (error) {
        console.error("Error deleting blog:", error.message);
        return res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
};
