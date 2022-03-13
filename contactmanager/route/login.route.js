const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const User=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const mySecret = process.env['secretKey']

router.route("/")
.post(async(req,res)=>{
  const loginData=req.body
  try{
    const user=await User.findOne({username:loginData.username})
    if(user){
      if(bcrypt.compareSync(loginData.password,user.password)){
        const token=jwt.sign({userId:user._id},mySecret)
        res.json({success:true,token})
          }else{
        res.status(401).json({success:false,message:"username and password does not match"})
          }
    }else{
      res.status(401).json({success:false,message:"username does not exits"})
    }
  }catch(err){
    res.json({success:false,message:"Invalid username and password"})
  }
})
module.exports=router