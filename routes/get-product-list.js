const router = require("express").Router();
const mongoose = require('mongoose');
const { Product } = require("../models/product");

router.get("/", async (req, res) => {

    console.log("Getting product list...");

    // Prepare search parameters if any
    let findParams = {};
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    let selectionParams = {"_id":1, "name":1, "price":1};

    try {

        // Product.find(findParams).sort({ time: 'descending' }).exec((err, result) => {
        Product.find(findParams, selectionParams).exec((err, result) => {
            // sleep.sleep(1);
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;