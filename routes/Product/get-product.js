const router = require("express").Router();
const { Product } = require('../../models/product');

router.get("/", async (req, res) => {
    try {

        let product;
        // let resultFound = false;

        let selectionParams = {
            "_id": 1,
            "name": 1,
            "price": 1,
            "altLangName": 1,
            "category": 1,
            "buyable": 1,
            "sellable": 1,
            "barcode": 1,
            "mizzappID": 1,
            "preparationDuration": 1
        };

        if (req.query.computerSpecs){
            selectionParams.computerSpecsID = 1;
        }

        if (req.query.id) {
            console.log("Searching for product by ID...");
            product = await Product.findOne({ _id: req.query.id }, selectionParams);
        } else if (req.query.barcode) {
            console.log("Searching for product by Barcode...");
            product = await Product.findOne({ barcode: req.query.barcode }, selectionParams);
        } else if (req.query.mizzappID) {
            console.log("Searching for product by Mizzapp ID...");
            product = await Product.findOne({ mizzappID: req.query.mizzappID }, selectionParams);
        }

        // Respond
        res.status(200).send(product);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;