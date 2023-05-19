const router = require("express").Router();
const { Product } = require('../../models/product');

router.get("/", async (req, res) => {
    
    console.log("Deleting Product : " + req.query.id);
    
    try {

        Product.findOne({ _id: req.query.id }).exec((err, result) => {
            
            result.deleted = true;

            // Save
            result.save();

            // Respond
            res.status(200).send("OK");
        });
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;