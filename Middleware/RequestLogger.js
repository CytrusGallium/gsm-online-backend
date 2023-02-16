const { AddLogEntryToDB } = require('../models/log-entry');

const LogHttpRequest = function (req, res, next) {
    // console.log('Request URL:', req.originalUrl);
    // console.log('Request Type:', req.method);
    let info = { url: req.originalUrl, method: req.method };

    if (req.body)
        info.body = req.body;

    AddLogEntryToDB("HTTP_REQUEST_LOGGER", "INCOMING_HTTP_REQUEST", info);
    next();
};

module.exports = { LogHttpRequest };