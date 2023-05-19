const router = require("express").Router();
const mongoose = require('mongoose');
const fs = require('fs');
const { Reception } = require("../../models/reception");

router.post("/", async (req, res) => {

    console.log("========================================================");
    console.log("Installing New Database...");

    let nameToModelPairs = {};
    nameToModelPairs["receptions"] = Reception;

    try {
        // console.log(req.file);
        
        const db = mongoose.connection.db;
        await db.dropDatabase();

        const data = await fs.promises.readFile(req.file.path);
        const documents = JSON.parse(data);
        // console.log(documents);

        const collections_keys = Object.keys(documents);

        for (const ck of collections_keys) {
            
            if (nameToModelPairs[ck])
            {
                console.log("Installing collection : " + ck);

                const documents_keys = Object.keys(documents[ck]);
                for (const dk of documents_keys) {
                    await new nameToModelPairs[ck](documents[ck][dk]).save();
                }
            }
        }

        // keys.forEach(key => {
        //     console.log(key);
        //     const Model = mongoose.model('key', new mongoose.Schema({}));
        //     await Model.insertMany(documents);
        // });

        res.status(200).send({ message: "OK" });
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;