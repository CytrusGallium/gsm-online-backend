const router = require("express").Router();
const { Product } = require('../../models/product.js');
const { ComputerSpecs } = require('../../models/computer-specs.js');

router.get("/", async (req, res) => {

    console.log("Converting computer specs to product : " + req.query.id);

    try {
        const cs = await ComputerSpecs.findOne({ _id: req.query.id });

        if (cs) {

            const p = await new Product({
                name: cs.brand + " " + cs.model,
                description: "Description de l'Ordinateur",
                price: cs.price,
                computerSpecsID: cs._id
            }).save();

            res.status(200).send({ message: "OK", id: p._id });
        }
        else {
            res.status(200).send({ message: "COMPUTER_SPEC_NOT_FOUND" });
        }

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;