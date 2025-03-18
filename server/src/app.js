const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/userRoutes.js')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))


app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.status(200).json('success')
})

module.exports = { app }