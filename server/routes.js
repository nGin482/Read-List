const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record, getAllFiles, getCurrentDate} = require('./utils/utils')
const Story = require('./models/stories')

const apiRouter = express.Router()

const data = JSON.parse(fs.readFileSync('./sampledata/data.json'))
const data2 = getAllFiles()
    
// dateRead (not needed on initial add)

// Story.deleteMany({})

apiRouter.get('/api/stories', (request, response) => {
    response.status(200).json(data)
})

apiRouter.get('/api/stories/:FANDOM', (request, response) => {
    const fandom = request.params.FANDOM
    
    let status = false
    Object.keys(data).map(key => {
        if (key === fandom) {
            status = true
        }
    })
    if (!status) {
        response.status(404).json({error: 'No stories can be found with the given fandom'})
    }
    else {
        let result = []
        console.log(fandom)
        result = data[fandom + ' AO3']
        result.concat(data[fandom + ' FFN'])
        
        if (fandom === 'Transformers') {
            result.concat(data[fandom + ' All Media Types'])
            result.concat(data[fandom + ' Prime'])
        }
    
        response.status(200).json(result)
    }
})

apiRouter.get('/api/story/:ID', (request, response) => {
    const storyID = request.params.ID

    let result = data['Transformers All Media Types']
    const fandoms = ['Code Geass', 'Doctor Who', 'Endeavour', 'Lewis', 'NCIS', 'NCIS: LA', 'Person of Interest', 'Transformers']

    result = result.concat(data['Transformers Prime'])

    fandoms.map(fandom => {
        result = result.concat(data[fandom + ' FFN'])
        result = result.concat(data[fandom + ' AO3'])
    })
    
    const stories = result.filter(r => r.storyID === Number(storyID))
    if (stories.length === 0) {
        response.status(404).json({error: 'No story could be found with that ID'})
    }
    else {
        const story = stories[0]
        console.log(story)
        response.status(200).json(story)
    }

})

apiRouter.post('/api/stories', (request, response) => {
    const body = request.body
    
    if (body !== undefined) {
        const formatFile = getCurrentDate() + '.json'
    
        const stories = JSON.stringify(body, null, '\t')
        fs.writeFileSync('./stories/' + formatFile, stories)
    
        response.status(200).json({status: 'Success', stories: body})
    }
    else {
        response.status(400).json({status: 'Failure', cause: "The request did not include a body"})
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