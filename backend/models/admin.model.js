const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String,
    location:String,
    mobnum:Number
})

const Adminmodel=mongoose.model("admin",adminSchema);

module.exports={
    Adminmodel
}