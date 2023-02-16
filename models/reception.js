const mongoose = require('mongoose');

const receptionSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    provider: {type: String, default: ""},
    products: { type: Object, "default": {} },
    totalPrice: { type: Number, default: 0 },
    fulfilledPaiement: { type: Number, default: 0 },
    empty: { type: Boolean, default: true },
    stockageDone: { type: Boolean, default: false }, // After payment
    locked: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
});

const Reception = mongoose.model("reception", receptionSchema);

module.exports = { Reception };