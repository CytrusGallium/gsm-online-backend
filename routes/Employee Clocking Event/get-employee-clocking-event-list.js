const router = require("express").Router();
const { EmployeeClockingEvent } = require("../../models/employee-clocking-event");

router.get("/", async (req, res) => {

    console.log("Getting employee clocking events list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        EmployeeClockingEvent.find(findParams, selectionParams).exec((err, result) => {
            res.status(200).send(result);
        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;