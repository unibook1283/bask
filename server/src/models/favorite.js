const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    address_name: {
        type: String
    },
    id: {
        type: String
    },
    place_name: {
        type: String,
        required: true
    },
    road_address_name: {
        type: String
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

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite