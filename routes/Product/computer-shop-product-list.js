const router = require("express").Router();
const mongoose = require('mongoose');
const { Product } = require("../../models/product");
const { ComputerSpecs, ResolveComputerSpecs } = require("../../models/computer-specs");

router.get("/", async (req, res) => {

    console.log("Getting computer shop product list...");

    // Prepare search parameters if any
    let findParams = {};

    let selectionParams = {
        "_id": 1,
        "name": 1,
        "price": 1,
        "deleted": 1,
        "computerSpecsID": 1
    };

    try {

        Product.find(findParams, selectionParams).exec(async (err, result) => {

            let finalResult = [];

            for (const p of result) {
                if ((p.deleted == null || p.deleted == false) && p.computerSpecsID) {
                    let computerSpecs = await ResolveComputerSpecs(p.computerSpecsID);
                    finalResult.push({ id: p._id, name: p.name, price: p.price, computerSpecs: computerSpecs });
                }
            }

            res.status(200).send(finalResult);

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;