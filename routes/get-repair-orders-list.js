const router = require("express").Router();
const mongoose = require('mongoose');
const { RepairOrder } = require("../models/repair-order");
const sleep = require('sleep');

router.get("/", async (req, res) => {

    console.log("Getting repair orders list...");

    try {

        RepairOrder.find({}).sort({ time: 'descending' }).exec((err, result) => {
            sleep.sleep(1);
            res.status(200).send(PrepareDataForTable(result));
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

const PrepareDataForTable = (ParamQueryResult) => {
    let result = [];
    ParamQueryResult.forEach(ro => {
        result.push({roid:ro.roid, time:ro.time, customer:ro.customer, phone:ro.phone, items:ro.items});
    });
    return result;
}

module.exports = router;