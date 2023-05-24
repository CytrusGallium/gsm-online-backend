const router = require("express").Router();
// const mongoose = require('mongoose');
const { CateringOrder } = require("../../models/catering-order");

router.get("/", async (req, res) => {

    console.log("Getting catering orders list...");

    // Prepare search parameters if any
    let findParams = {deleted: false, empty:false, customerSittingTableID:{ $exists : false }, finalized:false};

    try {

        CateringOrder.find(findParams).sort({time: 1}).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;