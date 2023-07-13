const router = require("express").Router();
const { RepairOrderVersion } = require("../../models/repair-order-version");

router.get("/", async (req, res) => {

    console.log("Getting repair order history : " + req.query.roid);

    // Prepare search parameters if any
    let findParams = { roid: req.query.roid };

    try {

        RepairOrderVersion.find(findParams).sort({ version: 'descending' }).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

// const PrepareDataForTable = (ParamQueryResult) => {
//     let result = [];
//     ParamQueryResult.forEach(ro => {
//         result.push({ roid: ro.roid, time: ro.time, customer: ro.customer, phone: ro.phone, items: ro.items, locked: ro.locked, exitDate: ro.exitDate, totalPrice: ro.totalPrice, fulfilledPaiement: ro.fulfilledPaiement, deleted: ro.deleted });
//     });
//     return result;
// }

module.exports = router;