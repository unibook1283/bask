const express = require('express')
const router = new express.Router()
const Favorite = require('../models/favorite')
const auth = require('../middleware/auth')

router.post('/api/favorites/add', auth, async (req, res) => {   // req: detail
    
    req.body.owner = req.user._id

    const favorite = new Favorite(req.body) // owner 추가
        
    try {
        const isExist = await Favorite.exists({ owner: req.user._id, id: req.body.id})
        if (isExist) {
            return res.status(400).send({ errorMessage: '이미 추가되어 있습니다.'})
        }
        await favorite.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send({ errorMessage: '즐겨찾기 추가에 실패했습니다.'})
    }
})

router.get('/api/favorites', auth, async (req, res) => {
    const ownerCnt = []
    try {
        const favorites = await Favorite.find({ owner: req.user._id })

        for (const favorite of favorites) {
            const cnt = await Favorite.count({ id: favorite.id })
            // favorite.ownerCnt = cnt      // 이건 왜 안되지? cnt가 아직 값을 못 받은거 같은데.
            ownerCnt.push(cnt)      // 왜 이건 되는거지?
        }
        // favorites.forEach(async favorite => {
        //     const cnt = await Favorite.count({ id: favorite.id })
        //     ownerCnt.push(cnt)
        //     // favorite.ownerCnt = ownerCnt
        //     // console.log(favorite.ownerCnt)

        //     // console.log(ownerCnt)
        // })
        // console.log(favorites)

        // for (let i = 0; i < favorites.length; i++) {
        //     favorites[i].ownerCnt = test[i]
        // }
        // console.log(favorites)
        // console.log(test)
        res.send({favorites, ownerCnt})
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/favorites/delete', auth, async (req, res) => {
    try {
        // await req.body.remove()
        const favorite = await Favorite.findByIdAndDelete(req.body._id)
        res.send(favorite)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router