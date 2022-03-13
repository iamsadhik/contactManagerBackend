const mongoose=require("mongoose")
const {Schema}=mongoose;

const CardSchema=new Schema({
  firstName:{
    type:String,
    required:[true,"FirstName is required"]
  },
  lastName:{
    type:String,
    required:[true,"LastName is required"]
  },
  phone:{
    type:Number,
    required:[true,"number is required"],
    maxLength:10
  },
  email:{
    type:String,
    required:[true,"email is required"],
    lowecase:true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const ContactsSchema=new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  contact:[CardSchema]
})

const Contact=mongoose.model("Contact",ContactsSchema)
module.exports=Contact