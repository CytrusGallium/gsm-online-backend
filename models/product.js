const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    altLangName: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, default: 0 },
    sellable: { type: Boolean, default: true },
    buyable: { type: Boolean, default: true },
    requirePreparation: { type: Boolean, default: false }, // For example a sandwish requires preparation in the kitchen, while a bottle of water does not need prepartion because we bought it from the store.
    category: { type: String, default: "NULL" },
    availableAmount: { type: Number, default: 0 },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const DecrementProductAmount = (ParamProductID, ParamAmount) => {

    return new Promise(async (resolve) => {

        try {
            let p = await Product.findOne({ _id: ParamProductID });
            let newAmount = Number(p.availableAmount) - Number(ParamAmount);
            p.availableAmount = newAmount;
            p.save();
            // await Product.findByIdAndUpdate(ParamProductID, { availableAmount: { $inc: 1 } });
            resolve(true);
        } catch (error) {
            console.log("ERROR : " + error.message);
            resolve(false);
        }
    });
}

const Product = mongoose.model("product", productSchema);

module.exports = { Product, DecrementProductAmount };