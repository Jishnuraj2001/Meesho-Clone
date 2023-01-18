const express=require("express");
const menRouter=express.Router();

const{Menmodel}=require("../models/men.model");

menRouter.get("/",async(req,res)=>{
    const queryObj={};
    const sortObj={};
    const{price,title,rating,category}=req.query;
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
    try {
        const data=await Menmodel.find(queryObj).sort(sortObj);
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


module.exports={
    menRouter
}