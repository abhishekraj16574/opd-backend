import asyncHandler from "express-async-handler";
import { allocateToken } from "../services/tokenService.js";
import Token from "../models/Token.js";

export const bookToken = asyncHandler(async(req,res)=>{
  const token = await allocateToken(req.body);
  res.status(201).json(token);
});

export const cancelToken = asyncHandler(async(req,res)=>{
  const tokenDoc = await Token.findByIdAndDelete(req.params.id,{status:"CANCELED"},{new:true});

  if(!tokenDoc){
    return res.status(404).json({message:"Token not found"});
  }
/*
  if(tokenDoc.status==="CANCELLED"){return res.status(400).json({message:"Token already cancelled"});
}
  // it use when we dont want to delete from mongoDb
*/  
res.json({
    message: "Token cancelled successfully",
    tokenDoc,
  });
  /* tokenDoc.status="CANCELLED";
  await tokenDoc.save();
  res.json({message:"token cancelled"});
  */
});