const router = require("express").Router();
const { IncrementCateringOrderCounterAndGetNextCOID } = require('../../models/counter.js');
const { CateringOrder, AddCateringOrderToDB } = require('../../models/catering-order');

router.get("/", async (req, res) => {

    console.log("Generating empty catering order...");

    try {

        IncrementCateringOrderCounterAndGetNextCOID((resultCOID) => {

            AddCateringOrderToDB(resultCOID, [], (ParamNewID) => {

                res.status(200).send({ _id:ParamNewID, coid: resultCOID });

            });

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;