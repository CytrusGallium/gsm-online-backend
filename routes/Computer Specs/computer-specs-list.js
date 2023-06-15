const router = require("express").Router();
const mongoose = require('mongoose');
const { ComputerSpecs } = require("../../models/computer-specs");

router.get("/", async (req, res) => {

    console.log("Getting Computer Specs List...");

    // Prepare search parameters if any
    let findParams = {};

    try {

        ComputerSpecs.find().exec(async (err, result) => {

            res.status(200).send(result);

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;