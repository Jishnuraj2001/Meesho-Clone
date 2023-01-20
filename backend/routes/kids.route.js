const express=require("express");
const kidRouter=express.Router();

const{Kidmodel}=require("../models/kids.model");


kidRouter.get("/",async(req,res)=>{
    const queryObj={};
    const sortObj={};
    const{price,title,rating,category,limit,page}=req.query;
    if(price){
        if(price=="asc"||price=="ASC"){
            sortObj.price=1;
        }else if(price=="dsc"||price=="DSC"){
            sortObj.price=-1;
        }
    }
    if(rating){
        if(rating=="asc"||rating=="ASC"){
            sortObj.rating=1;
        }else if(rating=="dsc"||rating=="DSC"){
            sortObj.rating=-1;
        }
    }
    if(title){
        queryObj.title={"$regex":title,"$options":"i"};
    }
    if(category){
        queryObj.category={"$regex":category,"$options":"i"};
    }
    let Limit=0;
    if(limit){
        Limit=limit;
    }
    try {
        const data=await Kidmodel.find(queryObj).sort(sortObj).skip((page-1)*Limit).limit(Limit);
        res.send(data);
    } catch (error) {
        console.log(error.message);
        res.send("Unable to get the kid's data");
    }
})


kidRouter.post("/create",async(req,res)=>{
    const kidData=req.body;
    try {
        if(kidData){
            const data=Kidmodel(kidData);
            await data.save();
            res.send("kid data added to db");
        }else{
            res.send("unable to add kid data to DB");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable to add kid data to DB");
    }
})


kidRouter.patch("/update/:id",async(req,res)=>{
    const newData=req.body;
    const id=req.params.id;
    try {
        const kidData=await Kidmodel.findOne({_id:id});
        if(kidData){
            const kid_adminID=kidData.adminID;
            const req_adminID=req.body.adminID;
            if(kid_adminID==req_adminID){
                await Kidmodel.findByIdAndUpdate({_id:id},newData);
                res.send(`kid data with id=>${id} is updated`);
            }else{
                res.send({"msg":"you are not Authorized"});
            }
        }else{
            res.send({"msg":"you are not Authorized"});
        }
    } catch (error) {
        console.log(error.message);
        res.send({"msg":"you are not Authorized"});
    }
})


kidRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const kidData=await Kidmodel.findOne({_id:id});
        if(kidData){
            const kid_adminID=kidData.adminID;
            const req_adminID=req.body.adminID;
            if(kid_adminID==req_adminID){
                await Kidmodel.findByIdAndDelete({_id:id});
                res.send(`kid data with id=>${id} is deleted`);
            }else{
                res.send({"msg":"you are not Authorized"});
            }
        }else{
            res.send({"msg":"you are not Authorized"});
        }
    } catch (error) {
        console.log(error.message);
        res.send({"msg":"you are not Authorized"});
    }
})


module.exports={
    kidRouter
}