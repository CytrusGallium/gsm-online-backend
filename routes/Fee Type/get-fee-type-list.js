const router = require("express").Router();
const { FeeType } = require("../../models/feeType");

router.get("/", async (req, res) => {

    console.log("Getting fee type list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        FeeType.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;