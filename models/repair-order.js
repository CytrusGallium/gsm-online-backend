const mongoose = require('mongoose');

const RepairOrderState = {
   PENDING : "PENDING",
   DONE : "DONE",
   UNFIXABLE : "UNFIXABLE",
   CANCELED : "CANCELED"
}

const repairOrderSchema = new mongoose.Schema({
    location: {type : String, required : true},
    time : {type : Date, default: Date.now },
    customer : {type : String, required : true},
    phone: {type : String, required : true},
    items : {type : Array, "default" : [] },
    state : {type : String, default: RepairOrderState.PENDING},
    fulfilledPaiement : {type : Number, default: 0}
});

const RepairOrder = mongoose.model("repairOrder", repairOrderSchema);

const CreateRepairOrderItem = (ParamRepairType, ParamDeviceRef, ParamDeviceIMEI, ParamProblemName, ParamEstimatedPrice, ParamFinalPrice) => {
    return {type:ParamRepairType, ref:ParamDeviceRef, imei:ParamDeviceIMEI, problem:ParamProblemName, estPrice:ParamEstimatedPrice, price:ParamFinalPrice, state:RepairOrderState.PENDING};
}

const AddNewRepairOrderToDB = async (ParamLocation, ParamCustomer, ParamPhone, ParamItems) => {
    await new RepairOrder({location:ParamLocation, customer:ParamCustomer, phone:ParamPhone, items:ParamItems}).save();
}

module.exports = { RepairOrder, CreateRepairOrderItem, AddNewRepairOrderToDB, RepairOrderState };