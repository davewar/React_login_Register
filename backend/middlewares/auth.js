const jwt = require('jsonwebtoken')
require('dotenv').config();

const  authV1 = (req,res,next)=>{
    // console.log(req.header());

    const token = req.header('x-auth-token');
    // console.log("T",token);
    if(!token) return res.status(401).json({message:"Access Denied1"})

    try{
        jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
            // console.log("DW",err);
            //  console.log("D",decoded);
               if(err){
                  return res.json({auth:false,message:"ufailed"})
               }
            //    console.log(decoded.id);
            req.user = decoded.id
            next()
              })

    } catch(err){
        res.status(400).json({message1: err.message})

    }

}

module.exports = authV1