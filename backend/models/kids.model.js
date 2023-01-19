const mongoose=require("mongoose");

const kidSchema=mongoose.Schema({
    image:String,
    title:String,
    category:String,
    price:Number,
    rating:Number,
    adminID:String
})

const Kidmodel=mongoose.model("kid",kidSchema);

module.exports={
    Kidmodel
}