const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');
const { RepairOrderVersion } = require('../models/repair-order-version.js');
const sleep = require('sleep');

router.post("/", async (req, res) => {

    console.log("Updating repair order...");

    try {

        RepairOrder.findOne({ roid: req.body.roid }).exec(async (err, result) => {

            // console.log("RESULT = " + JSON.stringify(result));

            // Update version
            let oldVersion = result.version;
            const newVersion = oldVersion + 1;

            // Update potential changes
            result.location = req.body.location;
            result.customer = req.body.customer;
            result.phone = req.body.phone;
            result.items = req.body.items;
            result.empty = false;
            result.totalPrice = req.body.estPrice;
            result.version = newVersion;

            // Save
            result.save((err, model) => {
                // console.log("ERR = " + err);
                // console.log("MODEL = " + model);
            });

            await new RepairOrderVersion({
                location: req.body.location,
                customer: req.body.customer,
                phone: req.body.phone,
                roid: req.body.roid,
                items: req.body.items,
                totalPrice: req.body.estPrice,
                version: newVersion
            }).save();

            // Respond
            res.status(200).send("OK");
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;