const router = require("express").Router();
const { CateringOrder } = require('../../models/catering-order');

router.get("/", async (req, res) => {
    try {

        let cateringOrder;
        // let resultFound = false;

        if (req.query.id) {
            console.log("Searching for catering order by ID...");
            cateringOrder = await CateringOrder.findOne({ _id: req.query.id });

            // if (cateringOrder)
            //     resultFound = true;
        }

        // Respond
        res.status(200).send(cateringOrder);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;