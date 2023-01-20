const express=require("express");
const womenRouter=express.Router();

const{Womenmodel}=require("../models/women.model");


womenRouter.get("/",async(req,res)=>{
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
        const data=await Womenmodel.find(queryObj).sort(sortObj).skip((page-1)*Limit).limit(Limit);
        res.send(data);
    } catch (error) {
        console.log(error.message);
        res.send("Unable to get the women's data");
    }
})


womenRouter.post("/create",async(req,res)=>{
    const womenData=req.body;
    try {
        if(womenData){
            const data=Womenmodel(womenData);
            await data.save();
            res.send("women data added to db");
        }else{
            res.send("unable to add women data to DB");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable to add women data to DB");
    }
})


womenRouter.patch("/update/:id",async(req,res)=>{
    const newData=req.body;
    const id=req.params.id;
    try {
        const womendata=await Womenmodel.findOne({_id:id});
        if(womendata){
            const women_adminID=womendata.adminID;
            const req_adminID=req.body.adminID;
            if(women_adminID==req_adminID){
                await Womenmodel.findByIdAndUpdate({_id:id},newData);
                res.send(`women data with id=>${id} is updated`);
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


womenRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const womendata=await Womenmodel.findOne({_id:id});
        if(womendata){
            const women_adminID=womendata.adminID;
            const req_adminID=req.body.adminID;
            if(women_adminID==req_adminID){
                await Womenmodel.findByIdAndDelete({_id:id});
                res.send(`women data with id=>${id} is deleted`);
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
    womenRouter
}