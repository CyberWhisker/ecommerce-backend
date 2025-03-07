const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    inventoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Order', OrderSchema)