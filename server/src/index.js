require('dotenv').config()
const { app } = require('./app.js')
const  connectDB  = require('./db/connectDB.js')
const connectCloudinary = require('./config/cloudinary.js')

const PORT = process.env.PORT || 3001

connectDB()
.then(() => {
    connectCloudinary()
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection Failed...! :: ", err);
})