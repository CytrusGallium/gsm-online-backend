const router = require("express").Router();
const { Reception } = require("../../models/reception");

router.get("/", async (req, res) => {

    console.log("Getting reception list...");

    let findParams = {};
    let selectionParams = {};

    try {

        Reception.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;