const router = require("express").Router();
const { EmployeeClockingEvent } = require('../../models/employee-clocking-event');

router.post("/", async (req, res) => {

    console.log("New ECE...");
    console.log("New ECE : " + JSON.stringify(req.body));

    let rejected = "";

    try {

        await EmployeeClockingEvent.findOne({ employeeID: req.body.employeeID }, {}, { sort: { 'time': -1 } }).then( function (err, result) {
            // If Found nothing while trying to exit
            if (!result && req.body.type == "EXIT") {
                rejected = "NO_ENTRY";
                console.log("REJECTED = " + rejected);
            }
            // Two entries in a row, that's bad !
            else if (result && result.type && result.type == "ENTRY" && req.body.type == "ENTRY") {
                rejected = "TWO_ENTRY_IN_ROW";
                console.log("REJECTED = " + rejected);
            }
            // Two exits in a row, that's bad !
            else if (result && result.type && result.type == "EXIT" && req.body.type == "EXIT") {
                rejected = "TWO_EXIT_IN_ROW";
                console.log("REJECTED = " + rejected);
            }
        });

        if (rejected == "" || true) {
            await new EmployeeClockingEvent({
                employeeID: req.body.employeeID,
                type: req.body.type
            }).save();

            res.status(200).send({ message: "OK" });
        } else {
            res.status(200).send({ message: rejected });
        }

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;