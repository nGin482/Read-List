const mongoose = require('mongoose')

const {Schema} = mongoose

// fandom, summary, characters, relationships, chapters, words, updatedDate, publishedDate, storedDate, dateRead, genres, categories, warnings, tags, status, rating, archive, URL
const storySchema = new Schema({
    storyID: {required: true, type: Number},
    title: {required: true, type: String},
    author: {type: String},
    fandom: {type: String, ref: 'Fandom'},
    summary: {type: String},
    characters: [{type: String}],
    relationships: [{type: String}],
    chapters: {type: Number},
    words: {type: Number},
    updatedDate: {type: Date},
    publishedDate: {type: Date},
    collectedDate: {type: Date},
    dateRead: {type: Date},
    genres: [{type: String}],
    categories: [{type: String}],
    warnings: [{type: String}],
    tags: [{type: String}],
    status: {type: String},
    rating: {type: String},
    archive: {type: String},
    url: {type: String},
})

const Story = mongoose.model('Story', storySchema, 'Story')

module.exports = Story