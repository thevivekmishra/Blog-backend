import express from "express";
import { getAllUser } from "../controllers/user-controller.js";
import { signup } from "../controllers/signup-controller.js";
import {login} from "../controllers/login-controller.js";

const router = express.Router();

router.get("/", getAllUser); 
router.post("/signup",signup)
router.post("/login",login)

export default router;
