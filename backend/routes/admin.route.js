const express=require("express");
const adminRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const{Adminmodel}=require("../models/admin.model");
const e = require("express");


adminRouter.post("/register",async(req,res)=>{
    const{name,age,email,password,location,mobnum}=req.body;
    try {
        bcrypt.hash(password, 7,async(err, hash)=>{
            if(err){
                console.log(err.message);
                res.send("registration failed!,please try again.")
            }else{
                const adminData=new Adminmodel({name,age,email,"password":hash,location,mobnum});
                await adminData.save();
                res.send("Registration successful");
            }
        });
    } catch (error) {
        console.log(error.message);
        res.send("registration failed!,please try again.");
    }
})


adminRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const admin=await Adminmodel.findOne({email});
        if(admin){
            bcrypt.compare(password, admin.password,(err, result)=>{
                if(result==true){
                    const token = jwt.sign({adminID:admin._id},process.env.key);
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
    adminRouter
}