const router = require("express").Router();
const { IncrementRepairOrderCounter } = require('../models/counter.js');

router.get("/", async (req, res) => {

    console.log("Getting next RO ID...");

    try {

        IncrementRepairOrderCounter((result) => {
            res.status(200).send({ id: result });
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;