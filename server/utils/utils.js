const fs = require('fs')

const validateAO3Record = record => {
    record.chapters = record.chapters.substring(0, record.chapters.indexOf('/'))
    record.words = Number(record.words.replace(',', ''))
    record.storyID = record.url.substring((record.url.lastIndexOf('/')+1))
    console.log(record.date.split('/'))
    updatedDate = record.date.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)

    return record
}

const validateFFNRecord = record => {
    record.words = Number(record.words.replace(',', ''))
    record.relationships = record.characters.pairings
    record.characters = record.characters.characters
    record.title = record.title
    updatedDate = record.updatedDate.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)
    console.log(record.publishedDate)
    publishedDate = record.publishedDate.split('/')
    record.publishedDate = new Date(new Date().getFullYear(), Number(publishedDate[1])-1, Number(publishedDate[0])+1)

    return record
}

const getAllFiles = () => {
    const files = fs.readdirSync('./stories')
    const stories = []
    
    files.map(file => {
        stories.push({'date': file.substring(0, file.indexOf('.')), 'stories': JSON.parse(fs.readFileSync('./stories/' + file))})
    })

    return stories
}

const getCurrentDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const today = String(day) + '-' + String(month) + '-' + String(year)

    return today
}

const searchAllStoriesByKey = (key, expected) => {
    const stories = getAllFiles()
    let result = []

    if (key === 'storyID') {
        stories.map(day => {
            day.stories.map(story => {
                if (story[key] === expected) {
                    result.push(story)
                }
            })
        })
    }
    else {
        stories.map(day => {
            day.stories.map(story => {
                if (story[key].includes(expected)) {
                    result.push(story)
                }
            })
        })
    }
    // const result2 = stories.map(day => {
    //     day.stories.filter(story => story[key].includes(expected))
    // }) // returns undefined

    return result
}

module.exports = {
    validateAO3Record,
    validateFFNRecord,
    getAllFiles,
    getCurrentDate,
    searchAllStoriesByKey
}