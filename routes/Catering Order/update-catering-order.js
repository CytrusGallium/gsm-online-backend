const router = require("express").Router();
const { CateringOrder } = require("../../models/catering-order");
const { DecrementProductAmount } = require("../../models/product");

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

        if (req.body.finalized) {
            // Check if already finalized
            if (cateringOrder.finalized == true && req.body.finalized == true) {
                // Prevent re-finalization
                console.log("Rejecting Re-Finalization...");
                res.status(200).send("REJECTED");
                return;
            }
            else if (cateringOrder.finalized == false && req.body.finalized == true) {
                // Finalization (Must perform product unstockage)
                console.log("Performing Finalization and Unstockage...");
                console.log("Unstocking : " + JSON.stringify(cateringOrder.consumedProducts));
                const productKeys = Object.keys(cateringOrder.consumedProducts);

                // ...
                for (const k of productKeys) {
                    if (cateringOrder.consumedProducts[k].custom)
                        console.log("IGNORE_MISC_PROD_DESTOCK");
                    else
                        await DecrementProductAmount(k, cateringOrder.consumedProducts[k].amount);
                }

                // ...
                cateringOrder.finalizationTime = Date.now();
            }

            cateringOrder.finalized = req.body.finalized;
        }

        if (req.body.totalPrice) {
            // console.log("FINALIZED = " + req.body.finalized);
            cateringOrder.totalPrice = req.body.totalPrice;
        }

        if (req.body.fulfilledPaiement) {
            cateringOrder.fulfilledPaiement = req.body.fulfilledPaiement;
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