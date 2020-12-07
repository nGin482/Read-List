const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URL


const connectDB = async () => {
    console.log('connecting to MongoDB')
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('connected')
    }).catch(error => {
        console.log('error connecting to MongoDB - ', error.message)
        process.exit(1)
    })
    mongoose.set('useFindAndModify', false)
}

module.exports = connectDB;