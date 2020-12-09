const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate, searchAllStoriesByKey, stringToDate} = require('./utils/utils')
const Story = require('./models/stories')
const allStories = getAllFiles()

const apiRouter = express.Router()


apiRouter.get('/api/stories', (request, response) => {
    response.status(200).json(allStories)
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
        response.status(200).json(storiesForDate.stories)
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

apiRouter.put('/api/story/:Date/:ID', (request, response) => {
    const storyID = Number(request.params.ID)
    const date = request.params.Date
    const body = request.body

    const storiesForDate = allStories.find(day => day.date === date)
    if (storiesForDate === undefined) {
        response.status(404).json({error: 'There are no stories from this date'})
    }
    else {
        const story = storiesForDate.stories.find(s => s.storyID === storyID)
        if (story === undefined) {
            response.status(404).json({error: "The story you're looking for could not be found"})
        }
        else {
            if (body.field === 'Interested') {
                Story.findOne({storyID: storyID}).then(result => {
                    if (result === null) {
                        if (story.archive === 'Fanfiction.Net') {
                            const addStoryDB = new Story(validateFFNRecord(story))
                            addStoryDB.collectedDate = stringToDate(date)
                            addStoryDB.save().then(() => {
                                response.status(200).json({message: 'The story has been added to the read list', story: story})
                            }).catch(err => {
                                response.status(500).json({error: 'There was an error adding the story to the read list', res: err})
                            })
                        }
                        else {
                            const addStoryDB = new Story(validateAO3Record(story))
                            addStoryDB.collectedDate = date
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
                let updateStory = story
                updateStory[body.field] = body.value
                fs.writeFileSync('./stories/' + date + '.json', JSON.stringify(storiesForDate.stories, null, '\t'))
                response.status(200).json({message: 'This story has been updated'})
            }
        }
    }
})

apiRouter.put('/api/story/:ID', (request, response) => {
    const storyID = Number(request.params.ID)
    const body = request.body

    if (body.field === 'Complete') {
        Story.findOneAndUpdate({storyID: storyID}).then(result => {
            result.dateRead = stringToDate(getCurrentDate())
            response.status(200).json({message: 'This story has been marked as read'})
        }).catch(() => {
            // may need to handle this by checking if result is null
            response.status(409).json({message: 'This story has not been added to the read list yet'})
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

module.exports = apiRouter