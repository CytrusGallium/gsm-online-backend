const mongoose = require('mongoose');

var employeeClockingEventSchema = new mongoose.Schema({
    employeeID: { type: String, require: true },
    type: { type: String, required: true }, // ENTRY OR EXIT
    time: { type: Date, default: Date.now },
    pairID: { type: String, required: false }
});

const EmployeeClockingEvent = mongoose.model("employeeClockingEvent", employeeClockingEventSchema);

module.exports = { EmployeeClockingEvent };