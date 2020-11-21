const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URL

console.log('connecting to', url)

const connectDB = async () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('connected')
    }).catch(error => {
        console.log('error connecting to MongoDB - ', error.message)
        process.exit(1)
    })
}

module.exports = connectDB;