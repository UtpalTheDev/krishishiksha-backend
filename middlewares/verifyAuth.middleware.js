let jwt=require('jsonwebtoken');

function verifyAuth(req,res,next){



try{
  const token=req.headers.authorization.split(" ")[1];
  const {userId}=jwt.verify(token,process.env.Secret);
console.log(userId)
  req.userId=userId
  return next();
}
catch(error){
  console.log(error);
res.status(401).json({message:"authorization failed"});
}

}

module.exports={verifyAuth}