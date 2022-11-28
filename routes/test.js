const router = require("express").Router();
const {RepairOrder, CreateRepairOrderItem} = require('../models/repair-order.js');

router.get("/", async (req,res) => {
    try {
        console.log("Performing GSM Online Generic Test...");

        // Create some items to repair
        let item_1 = CreateRepairOrderItem("Phone", "Samsung Galaxy", "1398HR189R90182HR", "Screen", "12000", "N/A");
        let item_2 = CreateRepairOrderItem("Tablet", "iPad", "98GFJ93JF981JF98J", "Screen", "12000", "N/A");
        let items = [item_1, item_2];
        
        // console.log("TEST : ITEM 1 = " + JSON.stringify(item_1, null, 2));
        // console.log("TEST : ITEM 2 = " + JSON.stringify(item_2, null, 2));
        
        console.log("ITEM LIST = " + JSON.stringify(items, null, 2));
        
        // Add repair order to DB
        await new RepairOrder({location:"tlemcen", phone:"9875432121", items:items}).save();

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;