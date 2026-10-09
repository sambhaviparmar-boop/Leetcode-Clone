const User = require('../models/user')
const validate = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const RedisClient = require("../config/redis");
const Submission = require("../models/submission");


const register = async(req,res)=>{
   try {
    //validate the data
     validate(req.body);
    const {firstName , emailId , password} = req.body;

   req.body.password = await bcrypt.hash(password , 10);


   req.body.role = 'user'

  const user =   await User.create(req.body);  
  const token = jwt.sign({_id: user._id , emailId: emailId, role: 'user'}, process.env.JWT_KEY, {expiresIn: 60*60});

    const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id
      }

   res.cookie('token' , token, {maxAge: 60*60*1000});
   res.status(201).json({
    user: reply,
    message: "Registered Successfully"
   })
   }
    catch(error) {
         console.log("REGISTER ERROR:", error);
    res.status(400).send("Error: " + error);
   }


}

const login = async(req,res)=>{
    try {
        const {emailId , password} = req.body;

        if(!emailId){
            throw new Error("Invalid Credentials");
        }
        if(!password){
            throw new Error("Invalid Credentials");
        }

       const user =  await User.findOne({emailId});

      const match = await  bcrypt.compare(password , user.password);

      if(!match){
        throw new Error("Invalid Credentials")
      }

      const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id
      }

     const token = jwt.sign({_id: user._id , emailId: emailId, role: user.role}, process.env.JWT_KEY, {expiresIn: 60*60});
   res.cookie('token' , token, {maxAge: 60*60*1000});
   res.status(200).json({
    user: reply,
    message: "Loggin Successfully"
   })



    } catch (error) {
        res.status(401).send("Error :" +error)
    }
}


//logout
const logout = async(req,res)=>{
    try {
       //validate the token
       const {token} = req.cookies;

       const payload = jwt.verify(token,  process.env.JWT_KEY);

      await RedisClient.set(`token:${token}` , "Blocked")
      await RedisClient.expireAt(`token:${token}`, payload.exp);


       //add token on redis blocklist
       //cookies ko clear kr denge..... 

       res.cookie("token", null ,{
        expires: new Date(Date.now())
    });

       res.send("Logged out Sucessfully ")
    } catch (error) {
        res.status(401).send("Error :" + error.message)
    }
}





const adminRegister = async(req,res)=>{



 try {
    //validate the data
     validate(req.body);
    const {firstName , emailId , password} = req.body;

   req.body.password = await bcrypt.hash(password , 10);


//    req.body.role = 'admin'

  const user =   await User.create(req.body);  
  const token = jwt.sign({_id: user._id , emailId: emailId, role: user.role}, process.env.JWT_KEY, {expiresIn: 60*60});
   res.cookie('token' , token, {maxAge: 60*60*1000});
   res.status(200).send("User Registered Successfully")
   }
    catch(error) {
    res.status(400).send("Error: " + error);
   }




}


const deleteProfile = async(req,res)=>{
try {
    const userId = req.result._id;

    //userSchema delete
    await User.findByIdAndDelete(userId);

    //Submission se bhi delete kro
//    await Submission.deleteMany({userId});
   
  res.status(200).send("Deleted Successfully")


} catch (error) {
    res.status(500).send("Internal Server Error");
}
}


module.exports = {register , login , logout, adminRegister, deleteProfile};