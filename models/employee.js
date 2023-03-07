const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    familyName: { type: String, required: false },
    status: { type: String, default: "IDLE" },
});

// const GetCategoryList = () => {

//     return new Promise((resolve) => {

//         let finalResult = {};
//         let findParams = {};
//         let selectionParams = { "_id": 1, "name": 1 };

//         try {

//             Category.find(findParams, selectionParams).exec((err, result) => {

//                 result.forEach(cat => {
//                     finalResult[cat._id] = cat.name;
//                 });
//                 resolve(finalResult);
//             });

//         } catch (error) {
//             console.log("ERROR : " + error.message);
//             resolve(finalResult);
//         }
//     });
// }

const Employee = mongoose.model("employee", employeeSchema);

module.exports = { Employee };