const router = require("express").Router();
const { IncrementRepairOrderCounterAndGetNextROID } = require('../../models/counter.js');
const { AddEmptyRepairOrderToDB } = require('../../models/repair-order.js');

router.get("/", async (req, res) => {

    console.log("Generating empty repair order...");

    try {

        IncrementRepairOrderCounterAndGetNextROID((resultROID) => {

            AddEmptyRepairOrderToDB(resultROID, () => {

                res.status(200).send({ id: resultROID });

            });

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;