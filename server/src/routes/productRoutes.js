const { Router } = require("express");
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productController.js");
const upload = require("../middlewares/multer.js");

const router = Router();

router.route("/add").post(
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.route("/remove").post(removeProduct);
router.route("/single").post(singleProduct);
router.route("/list").get(listProducts);

module.exports = router;
