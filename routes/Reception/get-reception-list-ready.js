// ready in file name means that the result of the get query will be JSON ready to display as human understandable data for a table
const router = require("express").Router();
const { Reception } = require("../../models/reception");
const { ResolveProviderIdToFullName } = require("../../models/provider");

router.get("/", async (req, res) => {

    console.log("Getting reception list (Ready for Table)...");

    let findParams = {};
    let selectionParams = {};

    try {

        Reception.find(findParams, selectionParams).exec(async (err, result) => {
            let finalResult = [];

            // For each does not work well with "await" within... 
            for (const r of result) {
                let provider = await ResolveProviderIdToFullName(r.provider);
                finalResult.push({ id: r._id, time: r.time, provider: provider, products: Object.keys(r.products).length, total: r.totalPrice, stockageDone: r.stockageDone });
            }

            res.status(200).send(finalResult);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;