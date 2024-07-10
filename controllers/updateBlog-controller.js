import Blog from "../models/Blog.js";

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }
    catch (error) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({
            message: "Unable to update blog "
        })
    }
    return res.status(200).json({
        message: "Blog updated successfully"
    })
}
