const mongoose = require("mongoose");

async function main (){
    mongoose.connect(process.env.DB_Connect_String);
}


module.exports = main;