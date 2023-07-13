const router = require("express").Router();
const { RepairOrder } = require("../../models/repair-order");
const sleep = require('sleep');

router.get("/", async (req, res) => {

    console.log("Getting repair orders list...");

    // Pagination
    let skipAmount = 0;
    const RO_PER_PAGE = 15;

    if (req.query.page) {

        let p = 0;
        if (req.query.page < 0)
            p = 0;
        else
            p = req.query.page;

        skipAmount = p * RO_PER_PAGE;
    }

    // Prepare search parameters if any
    let findParams = {};
    if (req.query.roid) {
        findParams = { roid: req.query.roid };
        // console.log("ROID = " + req.query.roid);
    }
    else if (req.query.customer) {
        findParams = { customer: req.query.customer };
        // console.log("CUSTOMER = " + req.query.customer);
    }
    else if (req.query.phone) {
        findParams = { phone: req.query.phone };
        // console.log("CUSTOMER = " + req.query.customer);
    }
    else if (req.query.imei) {
        findParams = { 'items.imei': req.query.imei };
        console.log("IMEI = " + req.query.imei);
    }

    if (req.query.showDeleted){
        // findParams = {};
    }
    else
        findParams.deleted = false;

    try {

        RepairOrder.find(findParams).sort({ time: 'descending' }).skip(skipAmount).limit(RO_PER_PAGE).exec((err, result) => {
            // sleep.sleep(1);
            res.status(200).send(PrepareDataForTable(result));
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

const PrepareDataForTable = (ParamQueryResult) => {
    let result = [];
    ParamQueryResult.forEach(ro => {
        result.push({ roid: ro.roid, time: ro.time, customer: ro.customer, phone: ro.phone, items: ro.items, locked: ro.locked, exitDate: ro.exitDate, totalPrice: ro.totalPrice, fulfilledPaiement: ro.fulfilledPaiement, deleted: ro.deleted });
    });
    return result;
}

module.exports = router;