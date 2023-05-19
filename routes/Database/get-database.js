const router = require("express").Router();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

router.get("/", async (req, res) => {

    console.log("Getting database...");

    try {

        const db = mongoose.connection.db;
        console.log(db.databaseName);

        let result = {};

        const collections = await db.listCollections().toArray();
        for (const collection of collections) {
            const documents = await db.collection(collection.name).find().toArray();
            result[collection.name] = documents;
        }

        res.setHeader('Content-Disposition', `attachment; filename="\Base de Données.json"`);
        res.setHeader('Content-Type', 'text/plain');
        
        res.status(200).send(result);

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;