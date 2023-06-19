const mongoose = require('mongoose');

var computerSpecs = new mongoose.Schema({
    brand: { type: String, required: false },
    model: { type: String, required: true },
    screenSizeInInch: { type: Number, required: false },
    cpu: { type: String, required: false },
    coreCount: { type: Number, required: false },
    threadCount: { type: Number, required: false },
    cpuCacheInKb: { type: Number, required: false },
    ramInMb: { type: Number, required: false },
    ramType: { type: String, required: false },
    storageCapacityInGb: { type: Number, required: false },
    storageType: { type: String, required: false },
    gpu: { type: String, required: false },
    stateScore: { type: Number, required: false },
    price: { type: Number, required: false },
    time: { type: Date, default: Date.now }
});

const ResolveComputerSpecs = (ParamID) => {

    return new Promise((resolve) => {

        try {

            ComputerSpecs.findById(ParamID).exec((err, result) => {
                resolve(result);
            });

        } catch (error) {
            console.log("ERROR : " + error.message);
            resolve(null);
        }
    });
}

const ComputerSpecs = mongoose.model("computerSpecs", computerSpecs);

module.exports = { ComputerSpecs, ResolveComputerSpecs };