const jwt = require('jsonwebtoken');
const { User } = require('../models/user.js');

const DoJwtCheck = async (req, res, next) => {
    // console.log("HEADER = " + JSON.stringify(req.headers));
    // console.log("BODY = " + JSON.stringify(req.body));
    if (req.headers && req.headers.token) {

        try {
            // -----------------------------------------------------------------------------------------
            // Decode
            const decoded = jwt.verify(req.headers.token, process.env.JWT_PRIVATE_KEY);
            // console.log("DECODED = " + JSON.stringify(decoded));
            // Decoded Example : {"_id":"63f75c37b6acedef9a4bd402","iat":1677155412,"exp":1677241812}

            // Find
            const user = await User.findOne({ _id: decoded._id });

            // Check
            if (user.token == req.headers.token) {
                next();
            }
            else {
                return res.status(401).send({ message: "Login required." });
            }
            // -----------------------------------------------------------------------------------------
        } catch (error) {
            return res.status(401).send({ message: "Login required." });
        }

    }
    else {
        return res.status(401).send({ message: "Login required." });
    }
};

module.exports = { DoJwtCheck };