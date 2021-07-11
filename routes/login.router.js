const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const bcrypt=require("bcrypt");
const {usermodel}=require("../models/user.model.js")
const {loginValidation}=require("../utils/validation")
let jwt=require('jsonwebtoken');
router.route('/')
 .post(async (req, res) => {
   try{
     let {email,password}=req.body.user;
     const {error} = loginValidation({email,password});
      if (error){
        return res.status(400).json({message:error.details[0].message})
      }    
      let user=await usermodel.findOne({email});
      if(user){
        const validpassword=await bcrypt.compare(password,user.password);
        if(validpassword){
          let token=jwt.sign({userId:user._id},process.env.Secret);
          token=`Bearer ${token}`;          
          res.status(200).json({message:"success",token});
        }
        else{
          res.status(400).json({ error: "Email or password is wrong" });
        }
      }
     else {
      res.status(401).json({ error: "User does not exist" });
    }

   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get user",errormessage:error.message})
   }
  
})

module.exports=router;