const mongoose = require('mongoose');

const customerSittingTableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cateringOrder: { type: String, required: false },
    occupied: { type: Boolean, default: false }
});

const CustomerSittingTable = mongoose.model("customerSittingTable", customerSittingTableSchema);

const IfNoCustomerSittingTableDoThis = (ParamCallBack) => {
    CustomerSittingTable.count({}, function (err, count) {
        console.log("CST Count = " + count);
        if (Number(count) == 0) {
            ParamCallBack();
        }
    })
}

const CreateCustomerSittingTableInBatch = async (ParamTableCount) => {
    for (let index = 1; index <= ParamTableCount; index++) {
        await new CustomerSittingTable({ name: index }).save();
        console.log("Created CST : " + index);
    }
}

module.exports = { CustomerSittingTable, CreateCustomerSittingTableInBatch, IfNoCustomerSittingTableDoThis };