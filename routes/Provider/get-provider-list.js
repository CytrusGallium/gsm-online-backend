const router = require("express").Router();
const mongoose = require('mongoose');
const { Provider } = require("../../models/provider");

router.get("/", async (req, res) => {

    console.log("Getting providers list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        Provider.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;