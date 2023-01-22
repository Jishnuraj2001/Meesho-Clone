const mongoose=require("mongoose");

const landSchema=mongoose.Schema({
    image:String,
    title:String,
    category:String,
    price:Number,
    rating:Number,
    adminID:String
})

const Landmodel=mongoose.model("land",landSchema);

module.exports={
    Landmodel
}