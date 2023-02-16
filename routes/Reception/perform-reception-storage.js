const router = require("express").Router();
const { Reception } = require('../../models/reception');
const { Product } = require('../../models/product');
// const sleep = require('sleep');

router.post("/", async (req, res) => {

    console.log("Performing Reception Storage on : " + req.body.id);

    try {

        let reception = null;
        let error = false;

        if (req.body.id) {
            console.log("Searching for reception by ID : " + req.body.id);
            reception = await Reception.findOne({ _id: req.body.id });

            let productKeys = Object.keys(reception.products);
            let operationInfoArray = [];

            for (const k of productKeys) {
                console.log("MARK P");
                let productInfo = reception.products[k];
                console.log("Product : " + productInfo.product.value + " /// Amount : " + productInfo.amount);

                // Check if product key is defined
                if (productInfo && productInfo.product && productInfo.product != '' && productInfo.product.key) {

                    let product = await Product.findOne({ _id: productInfo.product.key });
                    if (product) {
                        operationInfoArray.push({ p: product, currentAmount: product.availableAmount, amountToAdd: productInfo.amount });
                    }
                    else {
                        console.log("ERROR : Product not found during storage operation :(");
                        error = true;
                        res.status(500).send({ message: "Internal server error" });
                        return;
                    }

                } else {
                    console.log("ERROR : Product not found during storage operation :(");
                    error = true;
                    res.status(500).send({ message: "Internal server error" });
                    return;
                }

            }

            // If no error perform storage.
            if (error == false) {

                try {
                    for (const o of operationInfoArray) {
                        console.log("MARK O");
                        o.p.availableAmount = Number(o.currentAmount) + Number(o.amountToAdd);
                        await o.p.save();
                    }
                } catch (error) {
                    console.log("ERROR while updating amounts :(");
                    error = true;
                }

            } else {
                console.log("ERROR : Unable to perform storage operation :(");
                error = true;
                res.status(500).send({ message: "Internal server error" });
                return;
            }

            // TODO : Do an extra check
            // ...

            reception.stockageDone = true;
            reception.save();
        }
        else {
            console.log("ERROR : Reception not found :(");
            res.status(500).send({ message: "Internal server error" });
        }

        if (error == false) {
            // Respond
            console.log("MARK R");
            res.status(200).send("OK");
        } else {
            res.status(200).send("ERROR");
        }


    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;