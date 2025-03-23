const { Router } = require("express");
const {
    addToCart,
    updateCart,
    getUserCart
} = require("../controllers/cartController.js");
const authUser = require('../middlewares/auth.js')

const router = Router();

router.route('/get').post(authUser, getUserCart)
router.route('/add').post(authUser, addToCart)
router.route('/update').post(authUser, updateCart)

module.exports = router