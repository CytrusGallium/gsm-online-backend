const router = require("express").Router();
const { RepairOrder } = require("../../models/repair-order");

router.get("/", async (req, res) => {

    console.log("Getting repair orders statistics...");

    // Prepare search parameters if any
    let findParams = {};

    // Not deleted
    findParams.deleted = false;

    // Range
    if (req.query.start && req.query.end) {
        const startDate = new Date(req.query.start);
        const endDate = new Date(req.query.end);

        findParams.exitDate = { $gte: startDate, $lte: endDate };
    }

    try {

        RepairOrder.find(findParams).exec((err, result) => {

            let totalFulfilledPaiement = 0;
            let totalExits = 0;

            result.forEach((r) => {
                // console.log("T = " + r.totalPrice);
                if (r.exitDate) {
                    console.log("P = " + r.fulfilledPaiement);
                    totalFulfilledPaiement += r.fulfilledPaiement;
                    totalExits++;
                }
            });

            res.status(200).send({ totalFulfilledPaiement: totalFulfilledPaiement, totalExits: totalExits });
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;