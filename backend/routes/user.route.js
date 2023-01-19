const express=require("express");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const{Usermodel}=require("../models/user.model");


userRouter.post("/register",async(req,res)=>{
    const{name,age,email,password,location,mobnum}=req.body;
    try {
        bcrypt.hash(password, 7,async(err, hash)=>{
            if(err){
                console.log(err.message);
                res.send("registration failed!,please try again.")
            }else{
                const userData=new Usermodel({name,age,email,"password":hash,location,mobnum});
                await userData.save();
                res.send("Registration successful");
            }
        });
    } catch (error) {
        console.log(error.message);
        res.send("registration failed!,please try again.");
    }
})


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await Usermodel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password,(err, result)=>{
                if(result==true){
                    const token = jwt.sign({adminID:user._id},process.env.key);
                    res.send({"msg":"login sucessful","token":token});
                }else{
                    res.send("You are not Authorized");
                }
            });
        }else{
            res.send("Yoare not Authorized");
        }
    } catch (error) {
        console.log(error.message);
        res.send("Youuu are not Authorized");
    }
})


module.exports={
    userRouter
}