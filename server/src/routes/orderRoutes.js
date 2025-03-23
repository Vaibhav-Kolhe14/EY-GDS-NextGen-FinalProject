const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} = require("../controllers/orderController.js");
const { Router } = require("express");
const adminAUTH = require("../middlewares/adminAUTH.js");
const authUser = require("../middlewares/auth.js");

const router = Router();

router.route("/list").post(adminAUTH, allOrders);
router.route("/status").post(adminAUTH, updateStatus);

router.route("/place").post(authUser, placeOrder);
router.route("/stripe").post(authUser, placeOrderStripe);
router.route("/razorpay").post(authUser, placeOrderRazorpay);

router.route("/userorders").post(authUser, userOrders);

module.exports = router;
