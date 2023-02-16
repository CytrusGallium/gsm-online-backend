const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const GetCategoryList = () => {

    return new Promise((resolve) => {

        let finalResult = {};
        let findParams = {};
        let selectionParams = { "_id": 1, "name": 1 };

        try {

            Category.find(findParams, selectionParams).exec((err, result) => {

                result.forEach(cat => {
                    finalResult[cat._id] = cat.name;
                });
                resolve(finalResult);
            });

        } catch (error) {
            console.log("ERROR : " + error.message);
            resolve(finalResult);
        }
    });
}

const Category = mongoose.model("category", categorySchema);

module.exports = { Category, GetCategoryList };