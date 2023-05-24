const mongoose = require('mongoose');

const cateringOrderSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    customerSittingTableID: { type: String, required: false },
    // consumedProducts: { type: Array, "default": [] },
    // consumedProducts: { type: String, required: false },
    consumedProducts: { type: Object, required: false },
    kitchenOrderIssued: { type: Boolean, default: false },
    totalPrice: { type: Number, default: 0 },
    fulfilledPaiement: { type: Number, default: 0 },
    coid: { type: String, required: true }, // Catering Order ID
    version: { type: Number, default: 1 },
    empty: { type: Boolean, default: true },
    finalized: { type: Boolean, default: false }, // After payment
    finalizationTime: { type: Date, required: false },
    locked: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    note: { type: String, required: false },
    kitchenOrderTime: { type: Date, required: false },
    preparationDuration: { type: Number, default: 0 }
});

const CateringOrder = mongoose.model("cateringOrder", cateringOrderSchema);

// const CreateRepairOrderItem = (ParamRepairType, ParamDeviceRef, ParamDeviceIMEI, ParamProblemName, ParamEstimatedPrice, ParamFinalPrice) => {
//     return { type: ParamRepairType, ref: ParamDeviceRef, imei: ParamDeviceIMEI, problem: ParamProblemName, estPrice: ParamEstimatedPrice, price: ParamFinalPrice, state: RepairOrderState.PENDING };
// }

const AddCateringOrderToDB = async (ParamCOID, ParamItems, ParamCallback) => {
    console.log("AddNewCateringOrderToDB()");
    new CateringOrder({ coid: ParamCOID, items: ParamItems }).save((err, newCateringOrder) => {
        ParamCallback(newCateringOrder._id);
    });
}

// const AddEmptyRepairOrderToDB = async (ParamROID, ParamCallback) => {
//     console.log("AddEmptyRepairOrderToDB()");
//     await new RepairOrder({ location: " ", customer: " ", phone: " ", roid: ParamROID, items: [] }).save();
//     ParamCallback();
// }

// module.exports = { RepairOrder, CreateRepairOrderItem, AddNewRepairOrderToDB, RepairOrderState, AddEmptyRepairOrderToDB };
module.exports = { CateringOrder, AddCateringOrderToDB };