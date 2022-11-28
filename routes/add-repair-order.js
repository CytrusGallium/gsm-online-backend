const router = require("express").Router();
const {RepairOrder, CreateRepairOrderItem, AddNewRepairOrderToDB, RepairOrderState} = require('../models/repair-order.js');

router.post("/", async (req,res) => {
    try {
        console.log("Adding repair order...");
        console.log(req.body);

        const itemList = JSON.parse(req.body.items);
        console.log("TYPE = " + typeof itemList);
        console.log("JSON = " + JSON.stringify(itemList));
        console.log("LEN = " + itemList.length);

        AddNewRepairOrderToDB("Tlemcen", "Customer 1", "979461321321", itemList);

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;