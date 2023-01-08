const router = require("express").Router();
const mongoose = require('mongoose');
const { CustomerSittingTable } = require("../../models/customer-sitting-table");

router.get("/", async (req, res) => {

    console.log("Getting customer sitting tables list...");

    // Prepare search parameters if any
    let findParams = {};
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    try {

        CustomerSittingTable.find(findParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;