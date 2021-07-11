const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();
app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware")
const { verifyAuth } = require("./middlewares/verifyAuth.middleware")
app.use(cors());

const user = require("./routes/user.router.js")
const data = require("./routes/data.router.js")
const question=require("./routes/question.router");
const login=require("./routes/login.router.js");
const signup=require("./routes/signup.router.js");
//mongoose conn

mongoose.connect(process.env['DB_CONNECTION'],{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")})
.catch(eror=>{console.log("mongoose connection problem",error)})

app.get("/", (req, res) => {
  res.send("quiz api")
})

app.use('/user',verifyAuth, user);
app.use('/data',verifyAuth,data);
app.use('/question',question)
app.use('/login',login);
app.use('/signup',signup)
app.use(routeNotFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});