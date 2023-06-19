const router = require("express").Router();
const { LogEntry } = require("../../models/log-entry");

router.get("/", async (req, res) => {

    console.log("Getting http log entries...");

    // Prepare search parameters if any
    let findParams = {};

    try {

        LogEntry.find(findParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;