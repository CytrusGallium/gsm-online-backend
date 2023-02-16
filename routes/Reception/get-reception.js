const router = require("express").Router();
const { Reception } = require('../../models/reception');

router.get("/", async (req, res) => {
    try {

        let reception;
        // let resultFound = false;

        if (req.query.id) {
            console.log("Searching for reception by ID : " + req.query.id);
            reception = await Reception.findOne({ _id: req.query.id });
        }

        // Respond
        res.status(200).send(reception);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;