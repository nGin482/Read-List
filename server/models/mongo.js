const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URL

// require NotificationError service here
// in the catch block, call notification function


const connectDB = async () => {
    console.log('connecting to MongoDB')
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('connected')
    }).catch(error => {
        console.log('error connecting to MongoDB - ', error.message)
    })
    mongoose.set('useFindAndModify', false)
}

module.exports = connectDB;