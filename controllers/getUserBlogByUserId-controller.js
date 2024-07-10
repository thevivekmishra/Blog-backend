import User from "../models/User-modal.js";

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;

    try {
        // Find user by ID and populate the blogs field
        const user = await User.findById(userId).populate("blogs");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ blogs: user.blogs });
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        return res.status(500).json({ message: "Failed to fetch user blogs", error: error.message });
    }
};
