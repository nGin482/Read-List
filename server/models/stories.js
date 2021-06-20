const mongoose = require('mongoose')

const {Schema} = mongoose

// fandom, summary, characters, relationships, chapters, words, updatedDate, publishedDate, storedDate, dateRead, genres, categories, warnings, tags, status, rating, archive, URL
const storySchema = new Schema({
    storyID: {required: true, type: Number},
    collectedDate: {type: Date},
    dateRead: {type: Date},
    status: {type: String},
    archive: {type: String},
    url: {type: String},
})

const Story = mongoose.model('Story', storySchema, 'Story')

module.exports = Story