const express=require("express");
const landRouter=express.Router();

const{Landmodel}=require("../models/land.model");


landRouter.get("/",async(req,res)=>{
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
        const data=await Landmodel.find(queryObj).sort(sortObj).skip((page-1)*Limit).limit(Limit);
        res.send(data);
    } catch (error) {
        console.log(error.message);
        res.send("Unable to get the data");
    }
})


landRouter.post("/create",async(req,res)=>{
    const landData=req.body;
    try {
        if(landData){
            const data=Landmodel(landData);
            await data.save();
            res.send("landing page data added to db");
        }else{
            res.send("unable to add landing page data to DB");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable to add landing page data to DB");
    }
})


landRouter.patch("/update/:id",async(req,res)=>{
    const newData=req.body;
    const id=req.params.id;
    try {
        const landdata=await Landmodel.findOne({_id:id});
        if(landdata){
            const land_adminID=landdata.adminID;
            const req_adminID=req.body.adminID;
            if(land_adminID==req_adminID){
                await Landmodel.findByIdAndUpdate({_id:id},newData);
                res.send(`landing page data with id=>${id} is updated`);
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


landRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const landdata=await Landmodel.findOne({_id:id});
        if(landdata){
            const land_adminID=landdata.adminID;
            const req_adminID=req.body.adminID;
            if(land_adminID==req_adminID){
                await Landmodel.findByIdAndDelete({_id:id});
                res.send(`landing page data with id=>${id} is deleted`);
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
    landRouter
}