const mongoose=require("mongoose")


const ContactSchema=async()=>{
  try{
    await mongoose.connect( process.env['MONGODB'],{

  useUnifiedTopology:true,
  useNewUrlParser:true,
  })
    console.log("connection to db successful")
  }catch{
    console.log("connection to db failed")
  }
  
}
module.exports=ContactSchema


