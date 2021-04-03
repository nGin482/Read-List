const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate, searchAllStoriesByKey, stringToDate, findToUpdate} = require('./utils/utils')
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

    response.status(200).json(allStories.find(day => day.date === mostRecentDate))
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

    const stories = searchAllStoriesByKey('storyID', storyID)
    if (stories.length === 0) {
        response.status(404).json({error: 'No story could be found with that ID'})
    }
    else {
        response.status(200).json(stories)
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
    const storyID = Number(request.params.ID)
    const body = request.body

    if (body.stored === 'DB') {
        Story.findOneAndUpdate({storyID: storyID}).then(result => {
            result[body.field] = body.value
            result.save()
            response.status(200).json({message: 'This story has been updated'})
        })
    }
    else {
        const collection = findToUpdate(storyID)[0]
        let story = ''
        collection.map(archive => {
            archive.map(s => {
                if (s.storyID === storyID) {
                    story = s
                }
            })
        })
        if (story !== '') {
            story.story[field] = body.value
            fs.writeFileSync('./stories/' + story.date, JSON.stringify(collection, null, '\t'))
        }

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

module.exports = apiRouter