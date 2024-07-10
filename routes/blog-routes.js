import express from "express";
import { getAllBlogs } from "../controllers/getAllBlogs-controller.js";
import { addBlogs } from "../controllers/addBlogs-controller.js";
import { updateBlog } from "../controllers/updateBlog-controller.js";
import { getById } from "../controllers/getById-controller.js";
import { deleteBlog } from "../controllers/deleteBlog-controller.js";
import { getByUserId } from "../controllers/getUserBlogByUserId-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId)

export default blogRouter;
