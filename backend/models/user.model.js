const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    location:String,
    mobnum:Number
})

const Usermodel=mongoose.model("user",userSchema);

module.exports={
    Usermodel
}