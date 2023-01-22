const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const cors=require("cors");
app.use(cors());

const{connection}=require("./config/db")
const{adminRouter}=require("./routes/admin.route");
const{userRouter}=require("./routes/user.route");
const{menRouter}=require("./routes/men.route");
const{womenRouter}=require("./routes/women.route");
const{kidRouter}=require("./routes/kids.route");
const{landRouter}=require("./routes/land.route");
const{authenticator}=require("./middlewares/authenticator.middleware");


app.get("/",(req,res)=>{
    res.send("WeLCOME");
})

app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use(authenticator);
app.use("/men",menRouter);
app.use("/women",womenRouter);
app.use("/kid",kidRouter);
app.use("/land",landRouter);



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("CONNECTED TO THE DATABASE");
        console.log(`server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("UNABLE TO CONNECT TO THE DATABASE");   
    }
})