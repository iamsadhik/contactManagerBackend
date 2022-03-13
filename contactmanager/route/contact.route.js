const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const Contact=require("../model/contact.model")

const cardMiddleware=async(req,res,next)=>{
  try{
    const {user}=req
   
  let isCard=await Contact.findOne({userId:user._id})
  if(!isCard){
     isCard=new Contact({userId:user._id,contact:[]})
    isCard= await isCard.save()
  }
   
  req.card=isCard
  next();
  }catch(err){
    res.json({success:false,error:err.message})
  }
}
router.use(cardMiddleware)
router.route("/")
  .get(async(req,res)=>{
  const {user}=req
  const items=await Contact.find({userId:user._id})
    
    let list=[]
  items.map((item)=>{
    item.contact.map((part)=>{
      list.push(part)
    })
  })
 
  res.json({success:true,list})
})
 
.post(async(req,res)=>{
  try{
  const contactDetails=req.body
  const {user}=req
  const {card}=req
    
isCardExists=card.contact.find((items)=>items.phone==contactDetails.phone)

  if(isCardExists){
  res.status(409).json({success:false,message:"phone number already linked to another person"})
    return;
     }
  else{
card.contact.push({firstName:contactDetails.firstName,lastName:contactDetails.lastName,phone:contactDetails.phone,email:contactDetails.email})
    }
  const newData=await card.save()
  res.status(201).json({success:true,newData})
  }catch(err){
res.status(401).json({success:false,message:"error",error:err.message})
  }
})
module.exports=router