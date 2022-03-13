const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const User=require("../model/user.model")
const bcrypt=require("bcrypt")


router.route("/")
.get(async(req,res)=>{
  try{
    const data= await User.find()
  res.json({success:true,data})
  }catch(err){
    res.json({success:false,message:"No Data found",eroor:err.message})
  }
})
.post(async(req,res)=>{
  const userData=req.body
  try{
    const usernameExists=await User.findOne({username:userData.username})
      const emailExists=await User.findOne({email:userData.email})
if(usernameExists){
  res.status(409).json({success:false,message:"username already exists"})
  return usernameExists
}    
    if(emailExists){
      res.status(409).json({success:false,message:"Email already exists"})
      return emailExists
    }
    userData.password=bcrypt.hashSync(userData.password,10)
    const newUser= new User(userData)
    const savedData=await newUser.save()
    res.status(201).json({success:true,savedData})
  }catch(err){
    res.status(500).json({success:false,message:"failed store data in db",error:err.message})
  }
})
module.exports=router