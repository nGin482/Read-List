//fandomID, fandomName, archives, stories

const mongoose = require('mongoose')

const {Schema} = mongoose

const fandomSchema = new Schema({
    fandomID: {required: true, type: Schema.Types.ObjectId},
    name: {required: true, type: String},
    archives: [{type: String}],
    stories: [{type: String}]
})

const Fandom = mongoose.model('Fandom', fandomSchema, 'Fandom')

module.exports = Fandom