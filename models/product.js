const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    altLangName: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, default: 0 },
    sellable: { type: Boolean, default: true },
    buyable: { type: Boolean, default: true },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Product = mongoose.model("product", productSchema);

// const CreateNewUser = async (ParamName, ParamPass) => {

//     const user = await User.findOne({username:ParamName});

//     if (user)
//     {
//         console.log("FALSE");
//         return false;
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(ParamPass, salt);
//     await new User({username:ParamName, password:hashPassword}).save();
//     console.log("TRUE");
//     return true;
// }

// const GetUserCount = async () => {
//     console.log("IN-USER-COUNT");
//     User.countDocuments({name: 'users'}, function(error, count) {
//         console.log('Count is ' + count);
//         return count;
//     });

//     return -1;
// }

module.exports = { Product };