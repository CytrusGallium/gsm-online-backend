const router = require("express").Router();
const { User, CreateNewUser } = require('../../models/users');

router.post("/", async (req, res) => {

    console.log("New User...");

    try {
        CreateNewUser(req.body.username, req.body.password, req.body.level);
        res.status(200).send({ message: "OK" });
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;