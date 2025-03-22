const { Router } = require("express");
const {
    addToCart,
    updateCart,
    getUserCart
} = require("../controllers/cartController.js");

const router = Router();

router.route('/get').post(getUserCart)
router.route('/add').post(addToCart)
router.route('/update').post(updateCart)

module.exports = router