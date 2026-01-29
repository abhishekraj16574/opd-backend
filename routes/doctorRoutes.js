import express from "express";
import { createDoctor } from "../controllers/doctorController.js";
import { getDoctors } from "../controllers/doctorController.js";
console.log("Doctor routes loaded");

const router = express.Router();

router.post("/",createDoctor);
router.get("/",getDoctors);

router.get("/test",(req,res)=>{
  res.send("doctor route working");
});

export default router;
