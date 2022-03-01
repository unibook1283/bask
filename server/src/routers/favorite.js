const express = require('express')
const router = new express.Router()
const Favorite = require('../models/favorite')

router.post('/api/favorites/add', async (req, res) => {   // req: detail
    console.log(req.body)
    const favorite = new Favorite(req.body) // owner 추가
    try {
        await favorite.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router