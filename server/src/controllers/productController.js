const Product = require('../models/productModel.js')
const cloudinary = require('cloudinary').v2;

const addProduct = async(req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // console.log(name, description, price, category, subCategory, sizes, bestSeller)

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        // console.log(images)

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        // console.log(imagesUrl)
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new Product(productData)

        await product.save()

        res.json({success: true, message: "Product Added"})
    } catch (error) {
        console.log('Error in addProduct :: ', error)
        res.json({success: false, message: error.message})
    }
}

const listProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log('Error in listProduct :: ', error)
        res.json({success: false, message: error.message})
    }
}

const removeProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log('Error in removeProduct :: ', error)
        res.json({success: false, message: error.message})
    }
}

const singleProduct = async(req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log('Error in singleProduct :: ', error)
        res.json({success: false, message: error.message})
    }
}

module.exports = {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct
}