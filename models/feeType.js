const mongoose = require('mongoose');

var feeTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const GetFeeTypeByID = (ParamID) => {
    return new Promise(async (resolve) => {
        const ft = await FeeType.findById(ParamID);
        resolve(ft);
    });
} 

const FeeType = mongoose.model("feeType", feeTypeSchema);

module.exports = { FeeType, GetFeeTypeByID };