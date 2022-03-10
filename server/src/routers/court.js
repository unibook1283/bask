const express = require('express')
const router = new express.Router()
const Court = require('../models/court')
const User = require('../models/user')
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

router.get('/api/courts/unvalid', auth, async (req, res) => {
    try {
        const courts = await Court.find({ valid: false }).populate('owner')
        // 제보자 아이디도 send에 보내주세요.

        res.send(courts)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/courts/delete', auth, async (req, res) => {
    try {
        const court = await Court.findByIdAndDelete(req.body._id)
        console.log(court)
        res.send(court)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/courts', auth, async (req, res) => {
    try {
        await Court.findByIdAndUpdate(req.body.courtId, req.body)
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/api/courts/valid', async (req, res) => {
    console.log(req.body)

    try {
        // console.log(req)

        const courts = await Court.find({ address_name: {$regex: req.body.searchText}, valid: true })

        res.send(courts)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router