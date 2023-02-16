const router = require("express").Router();
// const mongoose = require('mongoose');
const { CateringOrder } = require("../../models/catering-order");

router.get("/", async (req, res) => {

    console.log("Getting catering orders list...");

    // Prepare search parameters if any
    let findParams = { deleted: 0 };
    // if (req.query.roid) {
    //     findParams = { roid: req.query.roid };
    //     // console.log("ROID = " + req.query.roid);
    // }

    // let selectionParams = { "_id": 1, "name": 1 };

    let pipeline = [
        {
            $match : { deleted : false }
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

        // CateringOrder.find(findParams).sort({ time: 'descending' }).exec((err, result) => {
        //     res.status(200).send(result);
        // });
        
        const result = await CateringOrder.aggregate(pipeline);
        
        if (result) {
            // console.log("RESULT = " + JSON.stringify(result));
            res.status(200).send(result);
        }

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;