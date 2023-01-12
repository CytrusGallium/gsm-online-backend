const router = require("express").Router();
const mongoose = require('mongoose');
const { Category } = require("../../models/category");

router.get("/", async (req, res) => {

    console.log("Getting category list...");

    // Prepare search parameters if any
    let findParams = {};
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    let selectionParams = { "_id": 1, "name": 1 };

    try {

        Category.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;