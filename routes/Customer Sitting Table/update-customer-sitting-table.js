const router = require("express").Router();
const { CustomerSittingTable } = require('../../models/customer-sitting-table');

router.post("/", async (req, res) => {
    try {
        let customerSittingTable;
        const id = req.body.id;
        console.log("Updating customer sitting table : " + id);
        console.log("BODY = " + JSON.stringify(req.body));

        customerSittingTable = await CustomerSittingTable.findOne({ _id: id });

        console.log("CST = " + JSON.stringify(customerSittingTable));

        if (req.body.occupied != null) {
            customerSittingTable.occupied = req.body.occupied;
        }
        
        if (req.body.cateringOrder != null) {
            customerSittingTable.cateringOrder = req.body.cateringOrder;
        }

        await customerSittingTable.save();

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;