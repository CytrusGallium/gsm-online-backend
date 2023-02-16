const router = require("express").Router();
const mongoose = require('mongoose');
const { User } = require("../../models/users");

router.get("/", async (req, res) => {

    console.log("Getting user list...");

    // Prepare search parameters if any
    let findParams = {};
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    let selectionParams = { "_id": 1, "username": 1, "level": 1 };

    try {

        User.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;