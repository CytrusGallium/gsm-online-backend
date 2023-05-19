const router = require("express").Router();
const { Fee } = require("../../models/fee");

router.get("/", async (req, res) => {

    console.log("Getting fee list...");

    let pipeline = [
        {
            $match: {
                feeTypeID: { $ne: 'NULL' }
            }
        },
        {
            $lookup:
            {
                from: "feetypes",
                let: { pid: "$feeTypeID" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "feeTypeID"
            }
        },
        {
            $sort: { "time": -1 }
        }
    ];

    try {

        const result = await Fee.aggregate(pipeline);
        return res.status(200).send(result);

        // Fee.find(findParams, selectionParams).exec((err, result) => {
        //     res.status(200).send(result);
        // });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;