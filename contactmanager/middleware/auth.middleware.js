const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const User=require("../model/user.model")
const mySecret = process.env['secretKey']


const AuthValidator=async(req,res,next)=>{

  const token=req.headers.authorization;
  console.log(token)
  if(!token){
    res.status(401).json({success:false,message:"user not logged in"})

    
     return;
  }
  try{
    const decoded=jwt.verify(token,mySecret)
    const user=await User.findById({_id:decoded.userId}).select("-password -__v");
    console.log({user})
if(!user){
  res.json({success:false,message:"Invalid user"})
}
    req.user=user;
    next();
  }catch(err){
    res.json({success:false,error:err.message})
  }
  
}
module.exports=AuthValidator