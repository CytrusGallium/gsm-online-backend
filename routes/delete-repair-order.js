const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');

router.get("/", async (req, res) => {

    console.log("Deleting Repair Order : " + req.query.roid + "...");

    try {

        RepairOrder.findOne({ roid: req.query.roid }).exec((err, result) => {

            if (result) {
                // Update version
                // let oldVersion = result.version;
                // result.version = oldVersion + 1;

                result.deleted = true;

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