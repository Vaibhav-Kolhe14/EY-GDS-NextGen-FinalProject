const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/userRoutes.js')
const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))


app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

module.exports = { app }