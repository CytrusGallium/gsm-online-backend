const router = require("express").Router();
const { CateringOrder } = require("../../models/catering-order");

router.post("/", async (req, res) => {
    try {

        let cateringOrder;
        const id = req.body.id;

        cateringOrder = await CateringOrder.findOne({ _id: id });

        cateringOrder.empty = false;

        if (req.body.consumedProducts)
            cateringOrder.consumedProducts = req.body.consumedProducts;

        if (req.body.kitchenOrderIssued)
            cateringOrder.kitchenOrderIssued = req.body.kitchenOrderIssued;

        if (req.body.finalized)
        {
            // console.log("FINALIZED = " + req.body.finalized);
            cateringOrder.finalized = req.body.finalized;
        }

        if (req.body.totalPrice)
        {
            // console.log("FINALIZED = " + req.body.finalized);
            cateringOrder.totalPrice = req.body.totalPrice;
        }

        if (req.body.customerSittingTableID)
            cateringOrder.customerSittingTableID = req.body.customerSittingTableID;

        await cateringOrder.save();

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;