const express = require('express');
const bodyParser=require("body-parser")
const cors=require("cors")
const ContactSchema=require("./db/db")
const userRouter=require("./route/user.route")
const loginRouter=require("./route/login.route")
const AuthValidator=require("./middleware/auth.middleware")
const contactRouter=require("./route/contact.route")

const app = express();
app.use(bodyParser.json())
app.use(cors())

//connection to db
ContactSchema()

app.use("/user",userRouter)
app.use("/login",loginRouter)
app.use("/contacts",AuthValidator,contactRouter)
app.get('/',(req, res) => {
  res.send('Hello Express app sadhik!')
});

app.listen(3000, () => {
  console.log('server started');
});
