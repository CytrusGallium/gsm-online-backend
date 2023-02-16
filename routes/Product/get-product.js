const router = require("express").Router();
const { Product } = require('../../models/product');

router.get("/", async (req, res) => {
    try {

        let product;
        // let resultFound = false;

        let selectionParams = { "_id": 1, "name": 1, "price": 1, "altLangName": 1, "category": 1, "buyable":1, "sellable":1 };

        if (req.query.id) {
            console.log("Searching for product by ID...");
            product = await Product.findOne({ _id: req.query.id }, selectionParams);

            // if (cateringOrder)
            //     resultFound = true;
        }

        // Respond
        res.status(200).send(product);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;