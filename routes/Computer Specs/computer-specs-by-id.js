const router = require("express").Router();
const { ComputerSpecs } = require('../../models/computer-specs');

router.get("/", async (req, res) => {

    console.log("Getting computer specs by ID...");

    try {

        let computerSpecs = await ComputerSpecs.findOne({ _id: req.query.id });

        // Respond
        res.status(200).send(computerSpecs);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;