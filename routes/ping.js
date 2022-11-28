const router = require("express").Router();

router.get("/", async (req,res) => {
    try {
        console.log("Ping...");

        // Respond
        res.status(200).send("PING : OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;