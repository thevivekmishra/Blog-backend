// import Blog from "../models/Blog.js";

// export const getById = async(req,res,next) => {
//     const id = req.params.id;
//     let blog;
//     try{
//         blog = await Blog.findById(id);
//     }
//     catch(error){
//         return console.log(err)
//     }
//     if(!blog){
//         return res.status(200).json({
//             message:"Blog not found please try again"
//         })
//     }
//     return res.status(200).json({blog})
// }


import Blog from "../models/Blog.js";

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found. Please try again."
            });
        }
        return res.status(200).json({ blog });
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        return res.status(500).json({
            message: "Failed to fetch blog. Please try again later."
        });
    }
};
