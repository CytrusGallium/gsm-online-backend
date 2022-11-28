const router = require("express").Router();
const {User, validate} = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post("/", async (req,res) => {
    try {
        console.log(req.body);
        
        const user = await User.findOne({userName:req.body.username});
        
        if (user)
            return res.status(409).send({message:"User with given name already exists!"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password_1, salt);
        
        await new User({...req.body, password:hashPassword}).save();
        
        res.status(201).send({message: "User created succesfully"});

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;