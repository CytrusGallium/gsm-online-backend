const router = require("express").Router();
const mongoose = require('mongoose');
const { Product } = require('../models/product');
const sleep = require('sleep');

router.get("/", async (req, res) => {
    try {
        console.log("Getting product picture : " + req.query.id + "...");
        const product = await Product.findById(req.query.id);

        if (product) {
            let img = product.img;
            res.setHeader('content-type', img.contentType);
            // sleep.sleep(0.1);
            res.status(200).send(img.data);
        }
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;