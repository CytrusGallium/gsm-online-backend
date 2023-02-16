const mongoose = require('mongoose');

var logEntrySchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    source: { type: String, required: true },
    tag: { type: String, required: true },
    info: { type: Object, required: false }
});

const LogEntry = mongoose.model("logEntry", logEntrySchema);

const AddLogEntryToDB = async (ParamSource, ParamTag, ParamData) => {
    new LogEntry({ source: ParamSource, tag: ParamTag, info: ParamData }).save();
}

module.exports = { LogEntry, AddLogEntryToDB };