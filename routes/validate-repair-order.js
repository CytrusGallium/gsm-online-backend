const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');
const sleep = require('sleep');
const { date } = require("joi");

router.post("/", async (req, res) => {

    console.log("Validating Repair Order : " + req.body.roid + "...");
    console.log("Validating Repair Order : " + JSON.stringify(req.body));

    try {

        RepairOrder.findOne({ roid: req.body.roid }).exec((err, result) => {

            if (result) {
                // Update version
                let oldVersion = result.version;
                result.version = oldVersion + 1;

                // Update potential changes
                // state
                result.state = req.body.state;
                // fulfilledPaiement
                result.fulfilledPaiement = req.body.fulfilledPaiement;
                // locked
                result.locked = req.body.locked;
                // note
                result.note = req.body.note;
                // Items
                result.items = req.body.items;
                // Exit date
                result.exitDate = Date.now;

                // Save
                result.save((err, model) => {
                    // console.log("ERR = " + err);
                    // console.log("MODEL = " + model);
                });

                // Respond
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send("NOT_FOUND");
            }

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;