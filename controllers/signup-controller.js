import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        //check user already exist or not using there email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists" 
            });
        }
        
        const hashedPassword = bcrypt.hashSync(password)

        //if user not exist create instance 
        const newUser = new User({ 
            name, 
            email, 
            password:hashedPassword,
            blogs:[],
        });

        await newUser.save();
        console.log('User saved successfully:', newUser);
        return res.status(201).json({ user: newUser });
    } 
    catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({ message: 'Failed to save user' });
    }
};
