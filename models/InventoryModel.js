const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InventorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Inventory', InventorySchema)