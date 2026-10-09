require("dotenv").config();
const express = require("express");
const app = express();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const  RedisClient  = require("./config/redis");
const problemRouter = require('./routes/problemCreator');
const submitRouter = require("./routes/submit");
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



app.use(express.json());
app.use(cookieParser());
app.use('/user' , authRouter);
app.use('/problem' , problemRouter);
app.use('/submission' , submitRouter)



const InitalizedConnection = async ()=>{

    try {
        
        await Promise.all([main(), RedisClient.connect()]);
        console.log("DB connected...");

         app.listen(process.env.PORT, ()=>{
    console.log("Server is running........"+ process.env.PORT);
})

    } catch (error) {
        console.log("Error :" + error);
    }
}




InitalizedConnection();




