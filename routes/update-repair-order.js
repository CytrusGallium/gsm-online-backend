const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');
const sleep = require('sleep');

router.post("/", async (req, res) => {
    
    console.log("Updating repair order...")
    
    try {

        // const roid = req.body.roid;
        // console.log("ROID = " + req.body.roid);

        RepairOrder.findOne({ roid: req.body.roid }).exec((err, result) => {
            
            // console.log("RESULT = " + JSON.stringify(result));
            
            // Update version
            let oldVersion = result.version;
            result.version = oldVersion + 1;

            // Update potential changes
            result.customer = req.body.customer;
            result.phone = req.body.phone;
            result.items = req.body.items;

            // Save
            result.save((err, model) => {
                console.log("ERR = " + err);
                console.log("MODEL = " + model);
            });

            // Respond
            res.status(200).send("OK");
        });

        // RepairOrder.findOne({ roid: roid }, async (result) => {

        //     // sleep.sleep(4);
        //     console.log("RESULT = " + JSON.stringify(result));
        //     repairOrder = result;
        //     let oldVersion = repairOrder.version;
        //     repairOrder = req.body;
        //     repairOrder.version = oldVersion + 1;

        //     await repairOrder.save();

        //     // Respond
        //     res.status(200).send("OK");
        // });

        // if (req.body.state)
        //     repairOrder.state = req.body.state;


    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;