const router = require("express").Router();
const { Reception } = require('../../models/reception');

router.post("/", async (req, res) => {

    console.log("New Reception...");

    try {

        let resultID = null;
        await new Reception({
            provider: req.body.provider,
            products: req.body.products,
            totalPrice: req.body.totalPrice
        }).save(function(err,generatedReception) {
            resultID = generatedReception._id;
            console.log("New Reception ID = " + resultID);
            res.status(200).send({ message: "OK", id:resultID });
         });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;