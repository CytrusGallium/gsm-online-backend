const router = require("express").Router();
const { Category } = require('../../models/category.js');
const fs = require('fs');

router.post("/", async (req, res) => {
    
    console.log("New Category...");
    
    try {
        // console.log("REQ = " + req);
        // console.log("CATEGORY NAME = " + req.body.name);
        var img = fs.readFileSync(req.file.path);
        // console.log("PATH = " + req.file.path);
        var encode_img = img.toString('base64');
        var final_img = {contentType:req.file.mimetype, data: new Buffer.from(encode_img, 'base64')};
        await new Category({name: req.body.name, description: req.body.description, img: final_img}).save();
        res.status(200).send({message:"OK"});
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }

})

module.exports = router;