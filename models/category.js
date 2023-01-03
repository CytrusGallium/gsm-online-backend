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

const Category = mongoose.model("category", categorySchema);

module.exports = { Category };