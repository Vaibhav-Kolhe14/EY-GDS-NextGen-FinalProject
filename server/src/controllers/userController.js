const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            res.json({success: false, message: "User does not exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
            const token = createToken(user._id)
            res.json({success: true, token: token})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log('Error in loginUser :: ', error)
        res.json({success: false, message: error.message})
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({email})

        if(exists) {
            return res.json({success: false, message: "User already exists"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token: token})
    } catch (error) {
        console.log('Error in registerUser :: ', error)
        res.json({success: false, message: error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token: token})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log('Error in adminLogin :: ', error)
        res.json({success: false, message: error.message})
    }
}

module.exports = {
    loginUser,
    registerUser,
    adminLogin
}