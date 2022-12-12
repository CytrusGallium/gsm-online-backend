const router = require("express").Router();
const {RepairOrder, AddNewRepairOrderToDB, RepairOrderState} = require('../models/repair-order.js');

router.post("/", async (req,res) => {
    try {
        console.log("Adding repair order...");
        console.log(req.body);

        console.log("MARK 0");
        const itemList = req.body.items;
        console.log("TYPE = " + typeof itemList);
        console.log("JSON = " + JSON.stringify(itemList));
        console.log("LEN = " + itemList.length);
        
        console.log("PHONE = " + req.body.phone);
        console.log("ROID = " + req.body.roid);

        console.log("MARK 1");
        await AddNewRepairOrderToDB(req.body.location, req.body.customer, req.body.phone, req.body.roid, itemList);
        console.log("MARK 2");

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;