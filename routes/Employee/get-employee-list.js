const router = require("express").Router();
const { Employee } = require("../../models/employee");

router.get("/", async (req, res) => {

    console.log("Getting employee list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        Employee.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;