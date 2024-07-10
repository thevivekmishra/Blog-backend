import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectWithDb } from './config/database.js';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog",blogRouter)

// MongoDB Connection
connectWithDb();

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// Default route
app.get("/default", (req, res) => {
    res.send("<h1>Hello</h1>");
});
