import Doctor from "../models/Doctor.js";
import asyncHandler from "express-async-handler";

export const createDoctor = asyncHandler(async(req,res) =>{
  const {name , department , slots } = req.body;
  const doctor = await Doctor.create({
    name,department,slots
  });
  res.status(201).json(doctor);
});

export const getDoctors = asyncHandler(async(req,res)=>{
  const doctors = await Doctor.find();
  res.json(doctors);
})