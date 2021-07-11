const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const {usermodel}=require("../models/user.model.js")

router.route('/userdetails')
 .get(async (req, res) => {
   try{
     let {userId}=req;
     const user=await usermodel.findOne({_id:userId}).select("name email");
     console.log(user,userId)
     res.status(200).json(user)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get user",errormessage:error.message})
   }
  
})

module.exports=router;