const express = require('express')
const router = new express.Router()
const Favorite = require('../models/favorite')
const auth = require('../middleware/auth')

router.post('/api/favorites/add', auth, async (req, res) => {   // req: detail
    req.body.owner = req.user._id

    const favorite = new Favorite(req.body) // owner 추가
    try {
        await favorite.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/favorites', auth, async (req, res) => {
    try {
        const favorites = await Favorite.find({ owner: req.user._id })
        res.send(favorites)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router