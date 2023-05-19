const router = require("express").Router();
const {RepairOrder} = require('../models/repair-order.js');

router.get("/", async (req,res) => {
    try {
        
        let repairOrder;
        
        if (req.query.roid)
        {
            console.log("Getting repair order by ROID...");
            repairOrder = await RepairOrder.findOne({roid:req.query.roid});
        }

        // Respond
        res.status(200).send(repairOrder);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;

// ----------------------------------------------------------------------------
// Old version that was probably useless
// ----------------------------------------------------------------------------

// module.exports = router;

// const router = require("express").Router();
// const {RepairOrder} = require('../models/repair-order.js');

// router.post("/", async (req,res) => {
//     try {
        
//         let repairOrder;
//         let resultFound = false;
        
//         if (req.body.customer)
//         {
//             console.log("Searching for repair order by customer name...");
//             repairOrder = await RepairOrder.findOne({customer:req.body.customer});

//             if (repairOrder)
//                 resultFound = true;
//         }

//         if (req.body.phone && !resultFound)
//         {
//             console.log("Searching for repair order by phone number...");
//             repairOrder = await RepairOrder.findOne({phone:req.body.phone});

//             if (repairOrder)
//                 resultFound = true;
//         }

//         // Respond
//         res.status(200).send("RESULT = " + repairOrder);

//     } catch (error) {
//         console.log("ERROR : " + error.message);
//         res.status(500).send({message:"Internal server error"});
//     }
// })

// module.exports = router;