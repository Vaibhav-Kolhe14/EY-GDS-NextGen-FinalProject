const { Router } = require('express')
const { loginUser, registerUser, adminLogin } = require('../controllers/userController.js')

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/admin').post(adminLogin)

module.exports = router
