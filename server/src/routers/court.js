const express = require('express')
const router = new express.Router()
const Court = require('../models/court')
const auth = require('../middleware/auth')

router.post('/api/courts/add', auth, async (req, res) => {
    req.body.owner = req.user._id

    const court = new Court(req.body)
        
    try {
        await court.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send({ errorMessage: 'error'})
    }
})

module.exports = router