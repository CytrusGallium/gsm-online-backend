const router = require("express").Router();
// const mongoose = require('mongoose');
const { CateringOrder } = require("../../models/catering-order");

router.get("/", async (req, res) => {

    console.log("Getting catering orders list...");

    // Prepare search parameters if any
    let findParams = {};
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    // let selectionParams = { "_id": 1, "name": 1 };

    try {

        CateringOrder.find(findParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;