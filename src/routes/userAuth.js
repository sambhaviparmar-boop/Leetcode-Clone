const express = require("express");
const {register , login , logout, adminRegister, deleteProfile} = require("../controllers/userAuth");
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const authRouter = express.Router();

//register 
authRouter.post('/register', register);

//  login 
authRouter.post('/login', login);


//  logout 
authRouter.post('/logout' , userMiddleware ,  logout);

// admin register
authRouter.post('/admin/register', adminMiddleware , adminRegister);

//account delete
authRouter.delete('/profile', userMiddleware , deleteProfile);


//user autheticate h yaa nahi 
authRouter.get('/check', userMiddleware, (req,res)=>{
    
    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id: req.result._id,
    }

    res.status(200).json({
        user: reply,
        message: "Valid User"
    })
})


//  getprofile
// authRouter.post('/getProfile', getProfile);



module.exports = authRouter;