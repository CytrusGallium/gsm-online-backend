const router = require("express").Router();
const mongoose = require('mongoose');
const { RepairOrder } = require("../models/repair-order");
const sleep = require('sleep');

router.get("/", async (req, res) => {

    console.log("Getting repair orders list...");

    // Prepare search parameters if any
    let findParams = {};
    if (req.query.roid) {
        findParams = { roid: req.query.roid };
        // console.log("ROID = " + req.query.roid);
    }
    else if (req.query.customer) {
        findParams = { customer: req.query.customer };
        // console.log("CUSTOMER = " + req.query.customer);
    }
    else if (req.query.phone) {
        findParams = { phone: req.query.phone };
        // console.log("CUSTOMER = " + req.query.customer);
    }
    else if (req.query.imei) {
        findParams = { 'items.imei': req.query.imei };
        console.log("IMEI = " + req.query.imei);
    }

    // Not deleted
    findParams.deleted = false;

    try {

        RepairOrder.find(findParams).sort({ time: 'descending' }).exec((err, result) => {
            // sleep.sleep(1);
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
        result.push({ roid: ro.roid, time: ro.time, customer: ro.customer, phone: ro.phone, items: ro.items, locked: ro.locked, exitDate:ro.exitDate });
    });
    return result;
}

module.exports = router;