const router = require("express").Router();
const { Product } = require('../../models/product');
const fs = require('fs');

router.post("/", async (req, res) => {

    console.log("Updating product : " + req.body.id);

    try {

        // Picture Check
        var finalImage;
        var pictureFound = false;

        if (req.file && req.file.path) {
            const img = fs.readFileSync(req.file.path);
            const encode_img = img.toString('base64');
            finalImage = { contentType: req.file.mimetype, data: new Buffer.from(encode_img, 'base64') };
            pictureFound = true;
        }

        Product.findOne({ _id: req.body.id }).exec((err, result) => {

            // Update potential changes
            result.name = req.body.name;
            result.altLangName = req.body.altLangName;
            result.description = req.body.description;
            result.price = req.body.price;
            result.category = req.body.category;
            result.buyable = req.body.buyable;
            result.sellable = req.body.sellable;
            result.barcode = req.body.barcode;
            result.preparationDuration = req.body.preparationDuration;

            if (pictureFound)
                result.img = finalImage;

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