const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');
const sleep = require('sleep');

router.post("/", async (req, res) => {
    
    console.log("Updating repair order...")
    
    try {

        RepairOrder.findOne({ roid: req.body.roid }).exec((err, result) => {
            
            // console.log("RESULT = " + JSON.stringify(result));
            
            // Update version
            let oldVersion = result.version;
            result.version = oldVersion + 1;

            // Update potential changes
            result.location = req.body.location;
            result.customer = req.body.customer;
            result.phone = req.body.phone;
            result.items = req.body.items;
            result.empty = false;
            result.totalPrice = req.body.estPrice;
            console.log("EST PRICE = " + req.body.estPrice);

            // Save
            result.save((err, model) => {
                // console.log("ERR = " + err);
                // console.log("MODEL = " + model);
            });

            // Respond
            res.status(200).send("OK");
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;