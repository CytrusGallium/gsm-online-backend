const router = require("express").Router();
const { Product } = require('../../models/product.js');
const sleep = require('sleep');
const fs = require('fs');

router.post("/", async (req, res) => {

    console.log("New Product...");
    
    try {
        
        var finalImage;
        if (req.file && req.file.path) {
            const img = fs.readFileSync(req.file.path);
            const encode_img = img.toString('base64');
            finalImage = { contentType: req.file.mimetype, data: new Buffer.from(encode_img, 'base64') };
        }

        await new Product({
            name: req.body.name,
            altLangName: req.body.altLangName,
            description: req.body.description,
            price: req.body.price,
            img: finalImage,
            category: req.body.category,
            barcode: req.body.barcode,
            mizzappID: req.body.mizzappID
        }).save();

        res.status(200).send({ message: "OK" });
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;