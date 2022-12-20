const router = require("express").Router();
const sleep = require('sleep');

router.get("/", async (req,res) => {
    try {
        console.log("Ping...");
        sleep.sleep(5);

        // Respond
        res.status(200).send("PING : OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;