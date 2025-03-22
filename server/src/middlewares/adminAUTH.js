const jwt = require("jsonwebtoken")

const adminAUTH = async(req, res, next) => {
    try {
        const { token } = req.headers
  
        if(!token) {
            return res.json({success: false, message: "Not Authorized Login Again"})
        }
       
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Not Authorized Login Again"})
        }
        

        next()
    } catch (error) {
        console.log("Error in adminAUTH :: ", error)
        res.json({success: false, message: error.message})
    }
}

module.exports = adminAUTH