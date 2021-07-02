const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate, searchAllStoriesByKey, stringToDate, findToUpdate, getAllDates, checkFandomAddition, getFandomData, checkFandomUpdate, checkFandomDeletion, writeToInterestedFile, removeFromReadingListFile, markStoryAsRead, checkStoryBeforeAddToComplete, moveStoryBacktoReadingList} = require('./utils/utils')
const Story = require('./mongo/models/stories')
const Fandom = require('./mongo/models/fandoms')
const allStories = getAllFiles()
const readingListPath = './stories/ReadingList/reading-list.json'
const completedListPath = './stories/CompletedList/completed-list.json'

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

apiRouter.get('/api/stories/fandom/:FANDOM', (request, response) => {
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
// new route for updating details

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

// Fandoms route

apiRouter.get('/api/fandoms', async (request, response) => {
    
    await Fandom.find({}).then(result => {
        if (result.length === 0) {
            response.status(404).json({message: 'There are no fandoms stored in the DB'})
        }
        else {
            response.status(200).json(result)
        }
    }).catch(err => {
        response.status(500).json({message: 'A problem occurred when trying to retrieve the list of fandoms.', error: err})
    })
})

apiRouter.post('/api/fandoms/add', async (request, response) => {
    const body = request.body

    let flag = false
    await Fandom.findOne({fandom: body.fandom}).then(result => {
        if (result) {
            response.status(409).json({message: 'The fandom given has already been recorded.'})
        }
        else {
            flag = true
        }
    }).catch(err => {
        response.status(500).json({message: 'There was an error trying to see if this fandom has already been recorded.', error: err})
    })
    
    if (flag) {
        const fandom = new Fandom({
            fandom: body.fandom,
            FFN_URL: body.ffn_url,
            AO3_URL: body.ao3_url,
            search: body.search
        })
        fandom.save().then(() => {
            response.status(200).json({message: 'The new fandom has been added.', fandom: fandom})
        }).catch(err => {
            response.status(500).json({message: 'There was an error trying to add the fandom to the list.', error: err})
        })
    }
})

apiRouter.put('/api/fandoms/:fandom/update', async (request, response) => {
    const body = request.body
    const fandom = request.params.fandom

    const correct_fields = ['fandom', 'FFN_URL', 'AO3_URL', 'search']
    let flag = false
    correct_fields.forEach(field => {
        if (field === body.field) {
            flag = true
        }
    })
    if (flag) {
        await Fandom.findOneAndUpdate({fandom: fandom}, {$set: {[body.field]: body.newData}}, {new: true}).then(result => {
            if (result) {
                response.status(200).json({message: 'The fandom has been updated with the details given. Please refresh the page to see the changes.', fandom: result})
            }
            else {
                response.status(404).json({message: 'The fandom you have chosen to update can not be found.'})
            }
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        response.status(400).json({message: 'The fandom can not be updated because the field given is not valid'})
    }
})

apiRouter.delete('/api/fandoms/:fandom/delete', async (request, response) => {
    const fandom = request.params.fandom

    await Fandom.findOneAndDelete({fandom: fandom}).then(result => {
        if (result) {
            response.status(200).json({message: 'The fandom has been deleted.', fandom: result})
        }
        else {
            response.status(404).json({message: 'The fandom given cannot be found.'})
        }
    }).catch(err => {
        response.status(500).json({message: 'There was an error deleting the fandom.', error: err})
    })
})

// Reading List routes

apiRouter.get('/api/reading-list', async (request, response) => {
    let readingList = []
    
    await Story.find({}).then(result => {
        const readListFile = JSON.parse(fs.readFileSync(readingListPath))
        result.forEach(story => {
            readListFile.forEach(fileStory => {
                if (story.url === fileStory.url) {
                    readingList.push(fileStory)
                }
            })
        })
        if (readingList.length !== 0) {
            response.status(200).json(readingList)
        }
        else {
            response.status(404).json({message: 'No stories were found in the reading list.'})
        }
    }).catch(err => {
        response.status(500).json({message: 'There was an error retrieving the reading list.', error: err})
    })
})

apiRouter.post('/api/reading-list/:ID', async (request, response) => {
    const storyID = Number(request.params.ID)
    const story = searchAllStoriesByKey('storyID', storyID)[0]

    if (story) {
       await Story.findOne({storyID: storyID}).then(result => {
            if (result === null) {
                let error = ''
                if (story.archive === 'Fanfiction.Net') {
                    const addStoryDB = new Story(validateFFNRecord(story))
                    addStoryDB.collectedDate = stringToDate(getCurrentDate())
                    addStoryDB.readStatus = false
                    addStoryDB.save().catch(err => {
                        error = err
                    })

                    if (writeToInterestedFile(story)) {
                        response.status(200).json({message: 'The story has been added to the read list', story: story})
                    }
                    else {
                        response.status(500).json({error: 'There was an error adding the story to the read list.', res: error})
                    }
                }
                else {
                    const addStoryDB = new Story(validateAO3Record(story))
                    addStoryDB.collectedDate = stringToDate(getCurrentDate())
                    addStoryDB.readStatus = false
                    addStoryDB.save().catch(err => {
                        error = err
                    })

                    if (writeToInterestedFile(story)) {
                        response.status(200).json({message: 'The story has been added to the read list.', story: story})
                    }
                    else {
                        response.status(500).json({error: 'There was an error adding the story to the read list.', res: error})
                    }
                }
            }
            else {
                if (result.readStatus) {
                    response.status(409).json({message: 'You have already read this story.'})
                }
                else {
                    response.status(409).json({message: 'This story has already been added to the read list.'})
                }
            }
        })
    }
    else {
        response.status(404).json({message: 'The story could not be found.'})
    }
})

apiRouter.delete('/api/reading-list/:storyID', async (request, response) => {
    const storyID = request.params.storyID

    await Story.findOneAndDelete({storyID: storyID}).then(result => {
        if (removeFromReadingListFile(storyID)) {
            response.status(200).json({message: 'This story has been removed from the reading list.'})
        }
        else {
            response.status(500).json({message: 'There was a problem removing the story from the reading list.'})    
        }
    }).catch(err => {
        console.log(err)
        response.status(500).json({message: 'There was a problem removing the story from the reading list.'})
    })
})

// Completed List routes

apiRouter.get('/api/completed-list', async (request, response) => {
    const completedList = []
    
    await Story.find({readStatus: true}).then(result => {
        if (result.length === 0) {
            response.status(404).json({message: 'There are no stories that have been read.'})
        }
        const completedListData = JSON.parse(fs.readFileSync(completedListPath))
        result.forEach(story => {
            completedListData.forEach(fileStory => {
                if (story.url === fileStory.url) {
                    completedList.push(fileStory)
                }
            })
        })
        response.status(200).json(completedList)
    }).catch(err => {
        response.status(500).json({message: 'There was a problem acessing the list of stories read.', error: err})
    })
})

apiRouter.post('/api/completed-list/:storyID', async (request, response) => {
    const storyID = Number(request.params.storyID)

    if (checkStoryBeforeAddToComplete(storyID)) {
        response.status(409).json({message: "You have already read this story."})
    }
    else {
        
        await Story.findOneAndUpdate({storyID: storyID}, {"$set": {readStatus: true, dateRead: stringToDate(getCurrentDate())}}).then(result => {
            result.save().catch(err => {
                response.status(500).json({message: 'There was a problem updating the story.', error: err})
            })
            if (markStoryAsRead(storyID)) {
                response.status(200).json({message: 'The story has been updated to show that it has been read.', readDate: result.dateRead})
            }
            else {
                response.status(500).json({message: "There was a problem marking the story as read. It has been updated in the database but the story's details do not reflect this."})
            }
        })
    }
})

apiRouter.delete('/api/completed-list/:storyID', async (request, response) => {
    const storyID = Number(request.params.storyID)

    await Story.findOne({storyID: storyID}).then(result => {
        result.readStatus = false
        result.dateRead = undefined
        result.save().catch(err => {
            response.status(500).json({message: 'There was a problem trying to move this story back to the reading list.', error: err})
        })
    })
    moveStoryBacktoReadingList(storyID)
    response.status(200).json({message: 'This story has been moved back to the reading list.'})
})

// Available Dates route

apiRouter.get('/api/dates', (request, response) => {
    if (getAllDates() === []) {
        response.status(404).json({error: 'No dates are available.'})
    }
    else {
        response.status(200).json(getAllDates())
    }
})

module.exports = apiRouter