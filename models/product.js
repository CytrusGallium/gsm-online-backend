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
    mizzappID: { type: String, required: false },
    img:
    {
        data: Buffer,
        contentType: String
    },
    barcode: { type: String, required: false },
    deleted: { type: Boolean, default: false },
    preparationDuration: { type: Number, default: 0 },
    computerSpecsID: { type: String, required: false }
});

const DecrementProductAmount = (ParamProductID, ParamAmount) => {

    return new Promise(async (resolve) => {

        try {
            let p = await Product.findOne({ _id: ParamProductID });
            if (p) {
                let newAmount = Number(p.availableAmount) - Number(ParamAmount);
                p.availableAmount = newAmount;
                p.save();
                resolve(true);
            }
            else
                resolve(false);
        } catch (error) {
            console.log("ERROR : " + error.message);
            resolve(false);
        }
    });
}

const Product = mongoose.model("product", productSchema);

module.exports = { Product, DecrementProductAmount };