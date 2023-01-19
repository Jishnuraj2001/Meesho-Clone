const mongoose=require("mongoose");

const womenSchema=mongoose.Schema({
    image:String,
    title:String,
    category:String,
    price:Number,
    rating:Number,
    adminID:String
})

const Womenmodel=mongoose.model("women",womenSchema);

module.exports={
    Womenmodel
}