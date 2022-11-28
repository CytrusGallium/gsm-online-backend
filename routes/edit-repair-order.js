const router = require("express").Router();
const {RepairOrder} = require('../models/repair-order.js');

router.post("/", async (req,res) => {
    try {
        
        let repairOrder;
        const id = req.body.id;
        
        repairOrder = await RepairOrder.findOne({_id:id});

        if (req.body.state)
            repairOrder.state = req.body.state;

        await repairOrder.save();

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;