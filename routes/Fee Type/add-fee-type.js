const router = require("express").Router();
const { FeeType } = require('../../models/feeType');

router.post("/", async (req, res) => {

    console.log("New Fee Type : " + JSON.stringify(req.body));

    try {

        await new FeeType({
            name: req.body.name
        }).save();

        res.status(200).send({ message: "OK" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;