const router = require("express").Router();
const { RepairOrder } = require('../models/repair-order.js');

router.get("/", async (req, res) => {
    try {

        let repairOrder = {};

        if (req.query.roid) {

            console.log("Getting repair order by ROID...");

            RepairOrder.find({ roid: req.query.roid }).exec(async (err, result) => {

                if (result) {
                    let highestVersion = result[0].version;
                    let highestVersionID = result[0]._id;

                    for (let i = 0; i < result.length; i++) {
                        if (result[i].version > highestVersion) {
                            highestVersion = result[i].version;
                            highestVersionID = result[i]._id;
                        }
                    }

                    repairOrder = await RepairOrder.findOne({ _id: highestVersionID });
                    res.status(200).send(repairOrder);
                }
            });
        }
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;