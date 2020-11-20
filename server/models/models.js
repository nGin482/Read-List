const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected')
}).catch(error => {
    console.log('error connecting to MongoDB - ', error.message)
    process.exit(1)
})