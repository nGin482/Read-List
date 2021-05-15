const fs = require('fs')

const validateAO3Record = record => {
    record.chapters = Number(record.chapters.substring(0, record.chapters.indexOf('/')))
    record.words = Number(record.words.replace(',', ''))
    record.storyID = record.url.substring((record.url.lastIndexOf('/')+1))
    updatedDate = record.updatedDate.split('/')
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
            day.stories.map(archive => {
                archive.stories.map(story => {
                    if (story[key] === expected) {
                        result.push(story)
                    }
                })
            })
        })
    }
    else {
        stories.map(day => {
            day.stories.map(archive => {
                archive.stories.map(story => {
                    if (story[key].includes(expected)) {
                        result.push(story)
                    }
                })
            })
        })
    }
    return result
}

const findToUpdate = ID => {
    const allCollections = getAllFiles()
    let result = []

    allCollections.map(day => {
        day.stories.map(archive => {
            archive.stories.map(story => {
                if (story.storyID === ID) {
                    result.push({date: day.date, dayCollection: day.stories})
                }
            })
        })
    })
    return result
}

const getAllDates = () => {
    const datesByMonth = breakIntoMonths()
    datesByMonth.map(month => {
        month.map(day => {
            if (day[0] >= '10') {
                month.sort((a, b) => a[0] - b[0])
            }
        })
        for (var i = 0; i < month.length; i++) {
            day = month[i]
            month[i] = day[0] + '-' + day[1] + '-' + day[2]
        }
        month.map(day => {
            day = day[0] + '-' + day[1] + '-' + day[2]
        })
    })
    return datesByMonth
}

const breakIntoMonths = () => {
    const files = fs.readdirSync('./stories')
    const dates_strings = []
    const months_orderd = []

    files.map(file => dates_strings.push(file.substring(0, file.indexOf('.')).split('-')))
    const months = [dates_strings[0][1]]
    let found = -1
    for (var idx = 1; idx < dates_strings.length-1; idx++) {
        for (var idxMonths = 0; idxMonths < months.length; idxMonths++) {
            if (dates_strings[idx][1] === months[idxMonths]) {
                found = 1
            }
        }
        if (found === -1) {
            months.push(dates_strings[idx][1])
        }
    }
    for (var i = 0; i < months.length; i++) {
        months_orderd.push([])
    }
    for (idxDates = 0; idxDates < dates_strings.length; idxDates++) {
        for (idxMonths = 0; idxMonths < months.length; idxMonths++) {
            if (dates_strings[idxDates][1] === months[idxMonths]) {
                months_orderd[idxMonths].push(dates_strings[idxDates])
            }
        }
    }
    return months_orderd
}

module.exports = {
    validateAO3Record,
    validateFFNRecord,
    getAllFiles,
    getCurrentDate,
    stringToDate,
    searchAllStoriesByKey,
    findToUpdate,
    getAllDates
}