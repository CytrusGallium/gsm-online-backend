const router = require("express").Router();
const { Product } = require('../../models/product');
// const sleep = require('sleep');

router.post("/", async (req, res) => {
    
    console.log("Updating product : " + req.body.id);
    
    try {

        // const roid = req.body.roid;
        // console.log("ROID = " + req.body.roid);

        Product.findOne({ _id: req.body.id }).exec((err, result) => {
            
            // console.log("RESULT = " + JSON.stringify(result));
            
            // Update version
            // let oldVersion = result.version;
            // result.version = oldVersion + 1;

            // Update potential changes
            result.name = req.body.name;
            result.altLangName = req.body.altLangName;
            result.description = req.body.description;
            result.price = req.body.price;
            result.category = req.body.category;

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