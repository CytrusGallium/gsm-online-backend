const router = require("express").Router();
const { Product } = require('../models/product');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const mime = require('mime-types');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return bitmap.toString('base64');
}

function getFileExtensionFromContentType(contentType) {
    const extension = mime.extension(contentType);
    return extension ? `.${extension}` : '';
}

router.get("/", async (req, res) => {

    try {

        console.log("Hosting product image : " + req.query.id);

        const product = await Product.findById(req.query.id);

        if (product) {
            let img;
            let contentType;

            if (product.img) {
                if (product.img.contentType) {
                    img = product.img.data;
                    contentType = product.img.contentType;
                }
                else {
                    console.log("!! PRODUCT HAS NO IMAGE !!");
                    img = base64_encode("image-not-found.webp");
                    contentType = "image/webp";
                }

                const buffer = Buffer.from(img, 'base64');
                const filePath = req.query.id + getFileExtensionFromContentType(contentType);

                fs.writeFile(filePath, buffer, { encoding: 'base64' }, async (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                    } else {
                        console.log('File written successfully');

                        const url = 'http://localhost:8000/upload';
                        // const url = 'https://occipital-resonant-bandicoot.glitch.me/upload';

                        const formData = new FormData();
                        formData.append('file', fs.createReadStream(filePath));

                        try {
                            const response = await axios.post(url, formData, {
                                headers: formData.getHeaders(),
                            });

                            console.log(response.data);
                            res.status(200).send({ message: "OK", file: response.data.file });
                        } catch (error) {
                            console.error(error);
                            res.status(200).send({ message: "ERROR" });
                        }
                    }
                });
            }
        }
        else {
            res.status(404).send("PRODUCT_NOT_FOUND");
        }


    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;