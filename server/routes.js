const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate, searchAllStoriesByKey} = require('./utils/utils')
const Story = require('./models/stories')
const allStories = getAllFiles()

const apiRouter = express.Router()


// Story.deleteMany({})

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

    console.log(storyID, date)
    console.log(body.field, )
    const storiesForDate = allStories.find(day => day.date === date)
    if (storiesForDate === undefined) {
        response.status(404).json({error: 'There are no stories from this date'})
    }
    else {
        const story = storiesForDate.stories.find(s => s.storyID === storyID)
        if (story === undefined) {
            response.status(404).json({error: 'The requested story could not be found'})
        }
        else {
            // update story
            // interested/mark story as read/update other field
            if (body.field === 'Interested') {
                // add to DB - check archive field
                // check if already in DB - if so --> don't add, inform user
                // dateCollected = date param
                console.log('interested')
            }
            // marking story as read
            // only applicable those in DB
            if (body.field === 'Complete') {
                // DB.story.dateRead = getCurrentDate()
                console.log('complete')
            }
            response.status(200).json(story)
        }
    }
})

// -----------------    BELOW NEEDED FOR STORIES GOING TO DATABASE    -------------------------------------

// tf_ao3.map(record => {
//     const newRecord = new Story(validateAO3Record(record))
//     newRecord.fandoms = record.fandoms
//     newRecord.id = newRecord._id.toString()
//     delete newRecord._id
//     delete newRecord._v
    
//     console.log(newRecord.updatedDate)
//     // newRecord.save().then(result => {
//     //     console.log('story added')
//     //     // console.log(result)
//     // })
// })
// console.log(tf_ao3.length)

// console.log('=================================================================')

// tf_ffn.map(record => {
//     const newRecord = new Story(validateFFNRecord(record, 'Doctor Who'))
    
//     // newRecord.save().then(() => {
//     //     console.log('story added')
//     // })
//     console.log(newRecord.author)
//     // console.log(newRecord.updatedDate)
// })

module.exports = apiRouter