const mongoose = require('mongoose');

const RepairOrderState = {
    PENDING: "PENDING",
    DONE: "DONE",
    UNFIXABLE: "UNFIXABLE",
    CANCELED: "CANCELED"
}

const repairOrderVersionSchema = new mongoose.Schema({
    location: { type: String, required: true },
    time: { type: Date, default: Date.now },
    customer: { type: String, required: true },
    phone: { type: String, required: true },
    items: { type: Array, "default": [] },
    state: { type: String, default: RepairOrderState.PENDING },
    totalPrice: { type: Number, default: 0 },
    fulfilledPaiement: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    roid: { type: String, required: true },
    version: { type: Number, default: 1 },
    primary_imei: { type: String, required: false }, // To facilitate research
    locked: { type: Boolean, default: false },
    empty: { type: Boolean, default: true },
    note: { type: String, required: false },
    exitDate: { type: Date, required: false },
    author : { type: String, required: false }
});

const RepairOrderVersion = mongoose.model("repairOrderVersion", repairOrderVersionSchema);

module.exports = { RepairOrderVersion };