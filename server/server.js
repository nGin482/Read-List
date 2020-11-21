require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record} = require('./utils/utils')
const connectDB = require('./models/mongo.js')
const Story = require('./models/stories')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

connectDB();

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})