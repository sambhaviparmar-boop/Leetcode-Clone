const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        immutable: true
    },
    password:{
     type: String,
     required: true
    },
    age:{
        type: Number,
        min: 4,
        max: 80
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    problemSolved: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'problem'
        }],
      unique: true
    }
},{
    timestamps: true
});



userSchema.post('findOneAndDelete', async function (userInfo){
    if(userInfo){
        await mongoose.model('submission').deleteMany({ userId: userInfo._id});
    }
});


const User = mongoose.model("user", userSchema);
module.exports = User;