const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    lastGenerationDate: { type: Date, default: Date.now }
});

const Counter = mongoose.model("counter", counterSchema);

// Repair Order ===============================================================================================
const CreateRepairOrderCounter = async () => {

    const counter = await Counter.findOne({ name: "repair-order" });

    if (counter) {
        console.log("FALSE : repair-order counter already exists.");
        return false;
    }

    await new Counter({ name: "repair-order", value: 1 }).save();
    console.log("TRUE : repair-order counter created.");
    return true;
}

// const GetCurrentRepairOrderCounterValue = async () => {

//     console.log("GetCurrentRepairOrderCounterValue");

//     const counter = await Counter.findOne({ name: "repair-order" });

//     if (counter) {
//         return counter.value;
//     }
//     else {
//         return -1;
//     }
// }

const IncrementRepairOrderCounterAndGetNextROID = async (ParamResultCallback) => {

    let result = -1;
    Counter.findOne({ name: "repair-order" }, (err, counter) => {
        // let rand = getRandomInt(1, 5);
        let rand = 1;
        result = counter.value + rand;
        counter.value = result;

        counter.save(function (err) {
            if (err) {
                console.error('ERROR : ' + err);
            }
        });

        ParamResultCallback(GetYYMM() + AddZeroes(result));
    });
}

// Catering Order ===============================================================================================
const CreateCateringOrderCounter = async () => {

    const counter = await Counter.findOne({ name: "catering-order" });

    if (counter) {
        console.log("FALSE : catering-order counter already exists.");
        return false;
    }

    await new Counter({ name: "catering-order", value: 1 }).save();
    console.log("TRUE : catering-order counter created.");
    return true;
}

const IncrementCateringOrderCounterAndGetNextCOID = async (ParamResultCallback) => {

    let result = -1;
    Counter.findOne({ name: "catering-order" }, (err, counter) => {
        const today = new Date();
        const genDate = counter.lastGenerationDate;
        
        if (sameDay(genDate, today))
        {
            result = counter.value + 1;
            counter.value = result;
        }
        else
        {
            result = 1;
            counter.value = 1;
            counter.lastGenerationDate = today;
            console.log("Catering order counter reset : New day.");
        }


        counter.save(function (err) {
            if (err) {
                console.error('ERROR : ' + err);
            }
        });

        ParamResultCallback(result);
    });
}

// Helper Functions ===============================================================================================
function GetYYMM() {
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var year = '' + d.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    // return year[2] + year[3] + "-" + month;
    return year[2] + year[3] + month;
}

function AddZeroes(ParamID) {
    let result = '' + ParamID;

    for (let index = result.length; index < 8; index++) {
        result = '0' + result;
    }

    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sameDay(d1, d2) {
    console.log("Comparing days : " + d1 + " AND " + d2);
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

// Exports ===============================================================================================
module.exports = {
    Counter,
    CreateRepairOrderCounter,
    CreateCateringOrderCounter,
    IncrementRepairOrderCounterAndGetNextROID,
    IncrementCateringOrderCounterAndGetNextCOID
};