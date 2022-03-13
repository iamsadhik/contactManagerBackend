const mongoose=require("mongoose")
const {Schema}=mongoose;



const UserSchema=new Schema({
  fullName:{
    type:String,
    required:[true,"Name is Required"]
  },
  username:{
    type:String,
    required:[true,"username is required"]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    lowercase:true,
  
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const User=mongoose.model("User",UserSchema)
module.exports=User
