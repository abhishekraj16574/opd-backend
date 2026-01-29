import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import tokenRoutes from "./routes/tokenRoutes.js";
import  doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();


const app=express();
app.use(express.json());

app.use("/api/tokens",tokenRoutes);
app.use("/api/doctors",doctorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

export default app;