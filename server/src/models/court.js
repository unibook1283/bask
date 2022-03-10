const mongoose = require('mongoose')

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address_name: {
        type: String
    },
    road_address_name: {
        type: String
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
    },
    valid: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

const Court = mongoose.model('Court', courtSchema)

module.exports = Court