const jwt = require('jsonwebtoken')

const authUser = async(req, res, next) => {
    const { token } = req.headers

    if(!token) {
        res.json({success: false, message: "Not Authorized"})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.id   //check function createToken from userController for ref

        next()
    } catch (error) {
        console.log('Error in authUser  middleware ::', error)
        res.json({success: false, message: error.message})
    }
}

module.exports = authUser