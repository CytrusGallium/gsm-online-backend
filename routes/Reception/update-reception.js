const router = require("express").Router();
const { Reception } = require('../../models/reception');
const sleep = require('sleep');

router.post("/", async (req, res) => {
    
    console.log("Updating reception : " + req.body.id);
    
    try {

        Reception.findOne({ _id: req.body.id }).exec((err, result) => {

            // console.log("RESULT = " + JSON.stringify(result));
            
            result.provider = req.body.provider;
            result.products = req.body.products;
            result.totalPrice = req.body.totalPrice;

            // Save
            result.save((err, model) => {
                console.log("ERR = " + err);
                // console.log("MODEL = " + model);
            });

            // Respond
            res.status(200).send("OK");
        });
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;