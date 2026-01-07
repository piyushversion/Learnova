const express = require("express");
const usermod = require("./models/usermodel");

const app = express();

const cookieparser = require("cookie-parser");

const cors = require("cors");

const expressfileupload = require("express-fileupload");

const cloudinaryconnect = require("./config/cloudinary");

const dbconnect = require("./config/database");

const userRoutes = require("./routes/userroutes");
const profileRoutes = require("./routes/profileroutes");
const courseRoutes = require("./routes/courseroutes");
const paymentRoutes = require("./routes/paymentroutes");

require("dotenv").config();


app.use(expressfileupload({useTempFiles:true,tempFileDir:'/tmp/'}))

app.use(express.json());
app.use(cookieparser());
app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(express.urlencoded({extended:true}));

app.use("/user",userRoutes);
app.use("/profile",profileRoutes);
app.use("/course",courseRoutes);
app.use("/payment",paymentRoutes);


cloudinaryconnect();

dbconnect();

app.get("/",(req,res)=>{

    res.send("Hello World");

})

const port = process.env.port || 3000

app.listen(port,()=>{

    console.log(`Server in running succesfully on port : ${port}`);

})