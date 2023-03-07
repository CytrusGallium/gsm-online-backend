const router = require("express").Router();
const { Fee } = require('../../models/fee');

router.post("/", async (req, res) => {

    console.log("New Fee : " + JSON.stringify(req.body));

    try {

        await new Fee({
            time: req.body.time,
            feeTypeID : req.body.feeTypeID,
            name: req.body.name,
            amount : req.body.amount
        }).save();

        res.status(200).send({ message: "OK" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;