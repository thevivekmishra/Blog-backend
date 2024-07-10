import Blog from "../models/Blog.js";
import User from "../models/user.js"; 

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        return res.status(500).json({ message: "Failed to fetch blogs" });
    }

    if (!userBlogs) {
        return res.status(404).json({
            message: "Blogs not found"
        });
    }

    return res.status(200).json({ blogs: userBlogs.blogs });
};
