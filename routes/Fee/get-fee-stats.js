const router = require("express").Router();
const { Fee } = require("../../models/fee");
const { GetFeeTypeByID } = require("../../models/feeType");

router.get("/", async (req, res) => {

    console.log("Getting fee stats...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        const result = await Fee.find(findParams, selectionParams);

        let total = 0;
        let totalPerFeeType = {};
        let totalPerFeeTypeReady = [];

        for (const f of result) {
            total += Number(f.amount);

            const ft = await GetFeeTypeByID(f.feeTypeID);
            if (ft) {
                // console.log("FeeType = " + JSON.stringify(ft));
                if (totalPerFeeType[ft._id]) {
                    totalPerFeeType[ft._id] += Number(f.amount);
                } else {
                    totalPerFeeType[ft._id] = Number(f.amount);
                }
            }
        }

        const totalPerFeeTypeKeys = Object.keys(totalPerFeeType);
        for (const k of totalPerFeeTypeKeys) {
            const ft = await GetFeeTypeByID(k);
            if (ft) {
                // console.log(ft.name + " = " + totalPerFeeType[k]);
                totalPerFeeTypeReady.push({ key: ft.name, data: totalPerFeeType[k] });
            }
        }

        const sorted = totalPerFeeTypeReady.sort(({data:a}, {data:b}) => b-a);

        return res.status(200).send({ total: total, totalPerFeeType: totalPerFeeType, totalPerFeeTypeReady: sorted });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;