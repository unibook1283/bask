const mongoose = require('mongoose')

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    goalposts: {
        type: Number,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Court = mongoose.model('Court', courtSchema)

module.exports = Court