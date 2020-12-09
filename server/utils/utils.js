const fs = require('fs')

const validateAO3Record = record => {
    record.chapters = Number(record.chapters.substring(0, record.chapters.indexOf('/')))
    record.words = Number(record.words.replace(',', ''))
    record.storyID = record.url.substring((record.url.lastIndexOf('/')+1))
    updatedDate = record.date.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)

    return record
}

const validateFFNRecord = record => {
    updatedDate = record.updatedDate.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)
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

const stringToDate = givenDate => {
    const day = Number(givenDate.substring(0, givenDate.indexOf('-')))
    const month = Number(givenDate.substring(givenDate.indexOf('-')+1, givenDate.lastIndexOf('-')))
    const year = Number(givenDate.substring(givenDate.lastIndexOf('-')+1, givenDate.length))

    return new Date(year, month-1, day+1)
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

    return result
}

module.exports = {
    validateAO3Record,
    validateFFNRecord,
    getAllFiles,
    getCurrentDate,
    stringToDate,
    searchAllStoriesByKey
}