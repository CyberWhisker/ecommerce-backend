const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtual field
ItemSchema.virtual('supply', {
    ref: 'Supply',
    localField: '_id',
    foreignField: 'itemId',
});

module.exports = mongoose.model('Item', ItemSchema)