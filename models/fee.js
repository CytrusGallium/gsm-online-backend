const mongoose = require('mongoose');

var feeSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    feeTypeID: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, default: 0 }
});

const Fee = mongoose.model("fee", feeSchema);

module.exports = { Fee };