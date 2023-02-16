const mongoose = require('mongoose');

var providerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    familyName: { type: String, default: "" }
});

const Provider = mongoose.model("provider", providerSchema);

const ResolveProviderIdToFullName = (ParamProviderID) => {

    return new Promise((resolve) => {

        let finalResult = null;
        let findParams = {_id:ParamProviderID};
        let selectionParams = {};

        try {

            Provider.find(findParams, selectionParams).exec((err, result) => {
                // console.log("RESULT = " + JSON.stringify(result));
                
                if (result && result[0])
                    finalResult = result[0].firstName + " " + result[0].familyName;
                else
                    finalResult = "";

                resolve(finalResult);
            });

        } catch (error) {
            console.log("ERROR : " + error.message);
            resolve(finalResult);
        }
    });
}

module.exports = { Provider, ResolveProviderIdToFullName };