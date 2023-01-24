const mongoose = require('mongoose');

const RepairOrderState = {
    PENDING: "PENDING",
    DONE: "DONE",
    UNFIXABLE: "UNFIXABLE",
    CANCELED: "CANCELED"
}

const repairOrderSchema = new mongoose.Schema({
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
    // TODO : Exit Date
});

const RepairOrder = mongoose.model("repairOrder", repairOrderSchema);

const CreateRepairOrderItem = (ParamRepairType, ParamDeviceRef, ParamDeviceIMEI, ParamProblemName, ParamEstimatedPrice, ParamFinalPrice) => {
    return { type: ParamRepairType, ref: ParamDeviceRef, imei: ParamDeviceIMEI, problem: ParamProblemName, estPrice: ParamEstimatedPrice, price: ParamFinalPrice, state: RepairOrderState.PENDING };
}

const AddNewRepairOrderToDB = async (ParamLocation, ParamCustomer, ParamPhone, ParamROID, ParamItems, ParamCallback) => {
    console.log("AddNewRepairOrderToDB()");
    await new RepairOrder({ location: ParamLocation, customer: ParamCustomer, phone: ParamPhone, roid: ParamROID, items: ParamItems }).save();
    ParamCallback();
}

const AddEmptyRepairOrderToDB = async (ParamROID, ParamCallback) => {
    console.log("AddEmptyRepairOrderToDB()");
    await new RepairOrder({ location: " ", customer: " ", phone: " ", roid: ParamROID, items: [] }).save();
    ParamCallback();
}

module.exports = { RepairOrder, CreateRepairOrderItem, AddNewRepairOrderToDB, RepairOrderState, AddEmptyRepairOrderToDB };