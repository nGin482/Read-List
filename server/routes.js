const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate, searchAllStoriesByKey, stringToDate, findToUpdate, getAllDates} = require('./utils/utils')
const Story = require('./models/stories')
const allStories = getAllFiles()

const apiRouter = express.Router()


apiRouter.get('/api/stories', (request, response) => {
    response.status(200).json(allStories)
})

apiRouter.get('/api/stories/mostRecent', (request, response) => {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() - 1)
    const mostRecentDate = String(newDate.getDate()) + '-' + String(newDate.getMonth()+1) + '-' + newDate.getFullYear()

    let mostRecent = allStories.find(day => day.date === mostRecentDate)
    if (!mostRecent) {
        let status = false
        while (status === false) {
            newDate.setDate(newDate.getDate() - 1)
            mostRecent = allStories.find(day => day.date === String(newDate.getDate()) + '-' + String(newDate.getMonth()+1) + '-' + newDate.getFullYear())
            if (mostRecent) {
                status = true
            }
            setTimeout(() => {
                mostRecent = []
            }, 5000)
        }
    }
    if (mostRecent === []) {
        response.status(404).json({error: 'No collections are currently available'})
    }
    else {
        response.status(200).json(mostRecent)
    }
})

apiRouter.get('/api/stories/:FANDOM', (request, response) => {
    const fandom = request.params.FANDOM
    
    const storiesByFandom = searchAllStoriesByKey('fandoms', fandom)
    if (storiesByFandom.length === 0) {
        response.status(404).json({error: 'No stories can be found with the given fandom'})
    }
    else {
        response.status(200).json(storiesByFandom)
    }
})

apiRouter.get('/api/story/:ID', (request, response) => {
    const storyID = Number(request.params.ID)

    const stories = searchAllStoriesByKey('storyID', Number(storyID))
    if (stories.length === 0) {
        response.status(404).json({error: 'No story could be found with that ID'})
    }
    else {
        response.status(200).json(stories[0])
    }

})

apiRouter.get('/api/stories/date/:Date', (request, response) => {
    const date = request.params.Date

    const storiesForDate = allStories.find(day => day.date === date)
    if (storiesForDate === undefined) {
        response.status(404).json({error: 'There is no file with this date'})
    }
    else {
        response.status(200).json(storiesForDate)
    }
})

apiRouter.post('/api/stories', (request, response) => {
    const body = request.body
    
    if (body !== undefined) {
        const time = new Date().getHours()
        let formatFile = ''
        if (time < 6) {
            const currentDate = getCurrentDate()
            formatFile = new Date().getDate()-1 + currentDate.substring(currentDate.indexOf('-')) + '.json'
        }
        else {
            formatFile = getCurrentDate() + '.json'
        }
    
        const stories = JSON.stringify(body, null, '\t')
        fs.writeFileSync('./stories/' + formatFile, stories)
    
        response.status(200).json({status: 'Success', stories: body})
    }
    else {
        response.status(400).json({status: 'Failure', cause: "The request did not include a body"})
    }
})

apiRouter.put('/api/story/:ID/interested', (request, response) => {
    const storyID = Number(request.params.ID)
    const story = searchAllStoriesByKey('storyID', storyID)[0]
    
    if (story) {
        Story.findOne({storyID: storyID}).then(result => {
            if (result === null) {
                if (story.archive === 'Fanfiction.Net') {
                    const addStoryDB = new Story(validateFFNRecord(story))
                    addStoryDB.collectedDate = stringToDate(getCurrentDate())
                    addStoryDB.save().then(() => {
                        response.status(200).json({message: 'The story has been added to the read list', story: story})
                    }).catch(err => {
                        response.status(500).json({error: 'There was an error adding the story to the read list', res: err})
                    })
                }
                else {
                    const addStoryDB = new Story(validateAO3Record(story))
                    addStoryDB.collectedDate = stringToDate(getCurrentDate())
                    addStoryDB.save().then(() => {
                        response.status(200).json({message: 'The story has been added to the read list', story: story})
                    }).catch(err => {
                        response.status(500).json({error: 'There was an error adding the story to the read list', res: err})
                    })
                }
            }
            else {
                response.status(409).json({message: 'This story has already been added to the read list'})
            }
        })
    }
    else {
        response.status(404).json({message: 'The story could not be found'})
    }
    // new route for updating details
})

apiRouter.put('/api/story/:ID', (request, response) => {
    const storyID = Number(request.params.ID)
    const body = request.body

    if (body.field === 'Complete') {
        Story.findOneAndUpdate({storyID: storyID}).then(result => {
            if (result === null) {
                response.status(409).json({message: 'This story has not been added to the read list yet'})
            }
            else {
                result.dateRead = stringToDate(getCurrentDate())
                response.status(200).json({message: 'This story has been marked as read'})
            }
        })
    }
    else {
        Story.findOneAndUpdate({storyID: storyID}).then(result => {
            result[body.field] = body.value
            result.save()
            response.status(200).json({message: 'This story has been updated'})
        })
    }
})

apiRouter.put('/api/update/:ID', (request, response) => {
    // update story details while browsing stories
    // needs work before implementing
    const storyID = Number(request.params.ID)
    const body = request.body

    const collection = findToUpdate(storyID)
    let storyToUpdate = ''
    let status = false

    collection.map(day => {
        day.dayCollection.map(archive => {
            archive.stories.map(story => {
                if (story.storyID === storyID) {
                    storyToUpdate = story
                    storyToUpdate[body.field] = body.value
                    fs.writeFileSync('./stories/' + day.date + '.json', JSON.stringify(day.dayCollection, null, '\t'))
                    console.log('updated', day.date)
                    status = true
                }
            })
        })
    })
    
    if (status) {
        response.status(200).json({message: 'This story has been updated'})
    }
    else {
        response.status(404).json({message: "The story you've selected cannot be found"})
    }
})

apiRouter.delete('/api/date/:Date', (request, response) => {
    const date = request.params.Date
    try {
        if (fs.existsSync('./stories/' + date + '.json')) {
            fs.unlinkSync('./stories/' + date + '.json')
            response.status(200).json({message: 'The stories for this date have been removed'})
        }
        else {
            response.status(404).json({message: 'This date could not be found'})
        }
    }
    catch(err) {
        response.status(500).json({message: 'An error occurred', error: err})
    }

})

apiRouter.get('/api/fandoms', (request, response) => {
    const fandoms = JSON.parse(fs.readFileSync('./archives/archives.json'))

    response.status(200).json(fandoms)
})

apiRouter.get('/api/dates', (request, response) => {
    if (getAllDates() === []) {
        response.status(404).json({error: 'No dates are available'})
    }
    else {
        response.status(200).json(getAllDates())
    }
})

module.exports = apiRouter