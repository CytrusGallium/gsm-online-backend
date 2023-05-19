const router = require("express").Router();
const mongoose = require('mongoose');
const { Product } = require('../models/product');
const sleep = require('sleep');
const fs = require('fs').promises;

router.get("/", async (req, res) => {
    try {
        // console.log("Getting product picture : " + req.query.id + "...");
        const product = await Product.findById(req.query.id);

        if (product) {
            let img;
            let contentType;

            if (product.img) {
                if (product.img.contentType) {
                    img = product.img.data;
                    contentType = product.img.contentType;
                }
                else {
                    console.log("NO IMG MARK");
                    img = await fs.readFile("image-not-found.webp");
                    contentType = "image/webp";
                }
            }

            res.setHeader('content-type', contentType);
            res.status(200).send(img);
            // res.status(200).send(img.data);
        }
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;