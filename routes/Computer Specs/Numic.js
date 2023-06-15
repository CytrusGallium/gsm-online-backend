// Numic is a software that gathers info about a computer then posts them to be used by other programs, 
// such as this web app.

const router = require("express").Router();
const { ComputerSpecs } = require('../../models/computer-specs');
// const dotenv = require('dotenv');

router.post("/", async (req, res) => {

    console.log("Numic report incoming...");

    try {
        // console.log("PASSWORD = " + req.body.password);
        // console.log("PASSWORD ENV = " + process.env.NUMIC_PASSWORD);

        if (req.body.password && process.env.NUMIC_PASSWORD && req.body.password == process.env.NUMIC_PASSWORD) {
            // console.log("CPU = " + req.body.cpu);

            await new ComputerSpecs({
                brand: req.body.brand,
                model: req.body.model,
                screenSizeInInch: req.body.screen_size_in_inch,
                cpu: req.body.cpu,
                coreCount: req.body.core_count,
                threadCount: req.body.thread_count,
                cpuCacheInKb: req.body.cpu_cache_in_kb,
                ramInMb: req.body.ram_in_mb,
                ramType : req.body.ram_type,
                storageCapacityInGb : req.body.storage_capacity_in_gb,
                storageType : req.body.storage_type,
                gpu : req.body.gpu,
                stateScore : req.body.state_score,
                price : req.body.price
            }).save();

            res.status(200).send({ message: "OK" });
        } else {
            res.status(200).send({ message: "ERROR" });
        }

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }

})

module.exports = router;