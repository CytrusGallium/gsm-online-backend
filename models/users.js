const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    firstName: {type:String, required:false},
    lastName: {type:String, required:false},
    email: {type:String, required:false},
    password: {type:String, required:true}
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, process.env.JWT_PRIVATE_KEY, {expiresIn:"1d"});
    return token;
}

const User = mongoose.model("user", userSchema);

const Validate = (data) => {
    const schema = joi.object({
        userName: joi.string().required().label("username"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

const CreateNewUser = async (ParamName, ParamPass) => {
    
    const user = await User.findOne({username:ParamName});
        
    if (user)
    {
        console.log("FALSE");
        return false;
    }
    
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(ParamPass, salt);
    await new User({username:ParamName, password:hashPassword}).save();
    console.log("TRUE");
    return true;
}

// const GetUserCount = async () => {
//     console.log("IN-USER-COUNT");
//     User.countDocuments({name: 'users'}, function(error, count) {
//         console.log('Count is ' + count);
//         return count;
//     });

//     return -1;
// }

module.exports = { User, Validate, CreateNewUser };