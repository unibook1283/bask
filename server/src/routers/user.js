const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/api/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        // const token = await user.generateAuthToken()
        // res.status(201).send({ user, token })
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/users/me', auth, (req, res) => {
    res.send(req.user)
})

router.patch('/api/users/me', auth, async (req, res) => {
    const keys = Object.keys(req.body)
    const possible = ['name', 'email', 'password']
    const isValidUpdate = keys.every((key) => possible.includes(key))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        keys.forEach((key) => req.user[key] = req.body[key])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('x_auth', token).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/api/users/logoutAll', auth, async (req, res) => { // 다른 기기로 로그인하는 걸 고려한건가
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/api/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/users/auth', auth, (req, res) => {
    res.send({
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        role: req.user.role
    })
})

module.exports = router