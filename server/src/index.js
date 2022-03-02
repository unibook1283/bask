const express = require('express')
const userRouter = require('./routers/user')
const favoriteRouter = require('./routers/favorite')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/bask')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('basketball server')
})

app.use(userRouter)
app.use(favoriteRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})