const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // console.log(req)
        // const token = req.header('Authorization').replace('Bearer ', '')
        
        const token = req.cookies.x_auth    // req.cookies를 쓰는데 cookie-parser가 필요한거구나
        const decoded = jwt.verify(token, 'basketball')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.send({ isAuth: false, errorMessage: '로그인 후 사용하실 수 있습니다.' })
    }
}

module.exports = auth