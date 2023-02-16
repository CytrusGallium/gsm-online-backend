const router = require("express").Router();
const { Provider } = require('../../models/provider');

router.post("/", async (req, res) => {

    console.log("New Provider : " + JSON.stringify(req.body));

    try {

        await new Provider({
            firstName: req.body.firstName,
            familyName: req.body.familyName
        }).save();

        res.status(200).send({ message: "OK" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;