const router = require("express").Router();
const { CustomerSittingTable } = require('../../models/customer-sitting-table');

router.post("/", async (req, res) => {
    try {
        let customerSittingTable;
        const id = req.body.id;
        console.log("Updating customer sitting table : " + id);
        console.log("BODY = " + JSON.stringify(req.body));

        customerSittingTable = await CustomerSittingTable.findOne({ _id: id });

        // Check if table already occupied, if so do nothing an let the client know it's already occupied
        if (req.body.occupied != null && req.body.occupied == true && customerSittingTable.occupied == true) {
            console.log("CST Already Occupied : " + JSON.stringify(customerSittingTable));
            // Respond
            res.status(200).send("ALREADY_OCCUPIED");
        }
        // Occupy table if not occupied
        else if (req.body.occupied != null && req.body.occupied == true && customerSittingTable.occupied == false) {
            console.log("CST occupation on the way : " + JSON.stringify(customerSittingTable));

            // Occupy
            customerSittingTable.occupied = req.body.occupied;

            // Set Catering Order
            if (req.body.cateringOrder != null) {
                customerSittingTable.cateringOrder = req.body.cateringOrder;
            }

            await customerSittingTable.save();

            // Respond
            res.status(200).send("OK");
        }
        // Free table if occupied
        else if (req.body.occupied != null && req.body.occupied == false && customerSittingTable.occupied == true) {
            console.log("CST freeing on the way : " + JSON.stringify(customerSittingTable));

            // Free the table
            customerSittingTable.occupied = false;
            customerSittingTable.cateringOrder = '';

            await customerSittingTable.save();

            // Respond
            res.status(200).send("OK");
        }



    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;