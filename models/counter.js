const mongoose = require('mongoose');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const counterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

const Counter = mongoose.model("counter", counterSchema);

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

const GetCurrentRepairOrderCounterValue = async () => {

    console.log("GetCurrentRepairOrderCounterValue");

    const counter = await Counter.findOne({ name: "repair-order" });

    if (counter) {
        return counter.value;
    }
    else {
        return -1;
    }
}

const IncrementRepairOrderCounter = async (ParamResultCallback) => {

    let result = -1;
    Counter.findOne({ name: "repair-order" }, (err, counter) => {
        let rand = getRandomInt(1, 5);
        result = counter.value + rand;
        counter.value = result;

        counter.save(function (err) {
            if (err) {
                console.error('ERROR : ' + err);
            }
        });

        ParamResultCallback(result);
    });
}

module.exports = { Counter, CreateRepairOrderCounter, IncrementRepairOrderCounter, GetCurrentRepairOrderCounterValue };