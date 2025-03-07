const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
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


module.exports = mongoose.model('Transaction', TransactionSchema)