const router = require("express").Router();
const { Reception } = require("../../models/reception");

router.get("/", async (req, res) => {

    console.log("Getting total cost of receptions...");

    // Prepare search parameters if any
    let findParams = { deleted: false };
    let selectionParams = { totalPrice:1 };

    // Range
    if (req.query.start && req.query.end) {
        const startDate = new Date(req.query.start);
        const endDate = new Date(req.query.end);

        findParams.time = { $gte: startDate, $lte: endDate };
    }

    try {

        let total = 0;

        Reception.find(findParams, selectionParams).exec((err, result) => {
            result.forEach(r => {
                total += r.totalPrice;
            });
            
            return res.status(200).send({total:total});
        });
        

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;