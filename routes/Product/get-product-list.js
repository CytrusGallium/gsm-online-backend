const router = require("express").Router();
const mongoose = require('mongoose');
const { Product } = require("../../models/product");
const { Category, GetCategoryList } = require("../../models/category");

router.get("/", async (req, res) => {

    console.log("Getting product list...");

    // Prepare search parameters if any
    let findParams = {};
    
    if (req.query.ignoreDeleted) {
        findParams.$or = [ { deleted: false }, { deleted: null } ];
    }
    
    if (req.query.sellable) {
        findParams.sellable = req.query.sellable;
    }

    if (req.query.buyable) {
        findParams.buyable = req.query.buyable;
    }

    let selectionParams = { "_id": 1, "name": 1, "price": 1, "altLangName": 1, "category": 1, "buyable": 1, "sellable": 1, "availableAmount":1 };

    try {

        Product.find(findParams, selectionParams).exec(async (err, result) => {

            let categoryList = await GetCategoryList();

            let finalResult = [];

            result.forEach(prod => {
                if (categoryList[prod.category])
                    finalResult.push({
                        "_id": prod._id,
                        "name": prod.name,
                        "price": prod.price,
                        "altLangName": prod.altLangName,
                        category: (req.query.resolveCategoryID ? categoryList[prod.category] : prod.category),
                        "buyable": prod.buyable,
                        "sellable": prod.sellable,
                        "availableAmount": prod.availableAmount
                    });
                else
                    finalResult.push({
                        "_id": prod._id,
                        "name": prod.name,
                        "price": prod.price,
                        "altLangName": prod.altLangName,
                        "category": (req.query.resolveCategoryID ? "?" : prod.category),
                        "buyable": prod.buyable,
                        "sellable": prod.sellable,
                        "availableAmount": prod.availableAmount
                    });
            });

            finalResult.sort(function (a, b) {
                var textA = a.category.toUpperCase();
                var textB = b.category.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            res.status(200).send(finalResult);

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;