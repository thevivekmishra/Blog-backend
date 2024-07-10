import Blog from "../models/Blog.js";

export const getAllBlogs = async (req,res,next) => {
    let blogs;

    try{
        blogs = await Blog.find().populate("user");
    }
    catch(error){
        return console.log(err)
    }

    if(!blogs){
        return res.status(404).json({
            message:"No blogs found"
        })
    }
    return res.status(200).json({blogs})
}


