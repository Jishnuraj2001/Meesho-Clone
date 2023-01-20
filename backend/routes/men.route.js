const express=require("express");
const menRouter=express.Router();

const{Menmodel}=require("../models/men.model");


menRouter.get("/",async(req,res)=>{
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
        const data=await Menmodel.find(queryObj).sort(sortObj).skip((page-1)*Limit).limit(Limit);
        res.send(data);
    } catch (error) {
        console.log(error.message);
        res.send("Unable to get the data");
    }
})


menRouter.post("/create",async(req,res)=>{
    const menData=req.body;
    try {
        if(menData){
            const data=Menmodel(menData);
            await data.save();
            res.send("men data added to db");
        }else{
            res.send("unable to add men data to DB");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable to add men data to DB");
    }
})


menRouter.patch("/update/:id",async(req,res)=>{
    const newData=req.body;
    const id=req.params.id;
    try {
        const mendata=await Menmodel.findOne({_id:id});
        if(mendata){
            const men_adminID=mendata.adminID;
            const req_adminID=req.body.adminID;
            if(men_adminID==req_adminID){
                await Menmodel.findByIdAndUpdate({_id:id},newData);
                res.send(`men data with id=>${id} is updated`);
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


menRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const mendata=await Menmodel.findOne({_id:id});
        if(mendata){
            const men_adminID=mendata.adminID;
            const req_adminID=req.body.adminID;
            if(men_adminID==req_adminID){
                await Menmodel.findByIdAndDelete({_id:id});
                res.send(`men data with id=>${id} is deleted`);
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
    menRouter
}