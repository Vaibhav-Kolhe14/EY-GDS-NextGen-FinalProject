const Order = require('../models/orderModel.js')
const User = require('../models/userModel.js')

const placeOrder = async(req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)

        await newOrder.save()

        await User.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: 'Order Placed'})
    } catch (error) {
        console.log('Error in placeOrder controller :: ', error)
        res.json({success: false, message: error.message})
    }
}

const placeOrderStripe = async(req, res) => {

}

const placeOrderRazorpay = async(req, res) => {

}

const allOrders = async(req, res) => {

}

const userOrders = async(req, res) => {
    try {
        const { userId } = req.body

        const orders = await Order.find({ userId })

        res.json({success: true, orders})
    } catch (error) {
        console.log('Error in userOrders controller :', error)
        toast.error(error.message)
    }
}

const updateStatus = async(req, res) => {

}

module.exports = {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}