const router = require("express").Router();
const { CateringOrder } = require("../../models/catering-order");

router.get("/", async (req, res) => {

    console.log("Getting catering orders list...");

    let matchAndParams = [];
    matchAndParams.push({ deleted: false });

    // Range
    if (req.query.start && req.query.end) {
        const startDate = new Date(req.query.start);
        const endDate = new Date(req.query.end);

        matchAndParams.push({time : { $gte: startDate, $lte: endDate }});
    }

    let pipeline = [
        {
            $match : { $and : matchAndParams}
        },
        {
            $lookup:
            {
                from: "customersittingtables",
                let: { pid: "$customerSittingTableID" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "table"
            }
        },
        {
            $sort: { "time": -1 }
        }
    ];

    try {

        const result = await CateringOrder.aggregate(pipeline);
        
        if (result) {
            res.status(200).send(result);
        }

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;