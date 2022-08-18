const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

},
    {
        timestamps: true
    })

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;