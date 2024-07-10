import express from 'express'
import mongoose from 'mongoose'

export const connectWithDb = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected successfully!!');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  };

 
  