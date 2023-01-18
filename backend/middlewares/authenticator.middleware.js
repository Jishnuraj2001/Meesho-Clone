const jwt=require("jsonwebtoken");
require("dotenv").config();

const authenticator=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token,process.env.key);
        if(decoded){
            let adminId=decoded.adminID;
            req.body.adminID=adminId;
            next();
        }else{
            res.send("Please login first");
        }
    }else{
        res.send("Please login first");
    }
}

module.exports={
    authenticator
}