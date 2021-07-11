const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const {usermodel}=require("../models/user.model.js")
const {signupValidation} = require("../utils/validation")
const bcrypt=require("bcrypt");

router.route('/')
 .post(async (req, res) => {
   try{
     let {name,email,password}=req.body.user;
     const {error} = signupValidation({name,email,password});
     if (error){
        return res.status(400).json({message:error.details[0].message})
      }   
     let user= await usermodel.findOne({email:email});
      if(!user){
      user=await usermodel.create({name,password,email});
      const salt=await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(user.password,salt);
      await user.save();
         
      res.status(200).json({message:"success"});
      }
      else{
        res.status(400).json({message:"email already exists"});
      }
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to save user",errormessage:error.message})
   }
  
})

module.exports=router;