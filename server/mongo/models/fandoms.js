const mongoose = require('mongoose')

const {Schema} = mongoose

const fandomSchema = new Schema({
    fandom: {type: String},
    FFN_URL: {type: String},
    AO3_URL: {type: String},
    search: {type: String},
    ignore: [{type: String}]
})

const Fandom = mongoose.model('Fandom', fandomSchema, 'Fandom')

module.exports = Fandom