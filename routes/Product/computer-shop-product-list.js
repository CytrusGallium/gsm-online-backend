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

                    let brandCheck = true, cpuCheck = true;

                    if (req.query.brand && computerSpecs.brand) {
                        console.log("Brand = " + req.query.brand + " /// " + computerSpecs.brand);
                        if (computerSpecs.brand.includes(req.query.brand))
                            brandCheck = true;
                        else
                            brandCheck = false;
                    }

                    if (req.query.cpu && computerSpecs.cpu) {
                        if (computerSpecs.cpu.includes(req.query.cpu))
                            cpuCheck = true;
                        else
                            cpuCheck = false;
                    }

                    if (brandCheck && cpuCheck)
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