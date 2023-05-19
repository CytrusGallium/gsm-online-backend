const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    products: { type: Object, required: false },
    totalPrice: { type: Number, default: 0 },
    fulfilledPaiement: { type: Number, default: 0 },
    empty: { type: Boolean, default: true },
    finalized: { type: Boolean, default: false }, // After payment
    finalizationTime: { type: Date, required: false },
    locked: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    note: { type: String, required: false }
});

const Sale = mongoose.model("sale", saleSchema);

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