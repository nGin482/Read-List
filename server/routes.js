const express = require('express')
const fs = require('fs')

const {validateFFNRecord, validateAO3Record} = require('./utils/utils')
const Story = require('./models/stories')

const apiRouter = express.Router()

const data = JSON.parse(fs.readFileSync('./data/data.json'))
// const tf_ao3 = data['Transformers AO3'].slice(0, 3)
// const tf_ffn = data['Doctor Who FFN'].slice(0, 3)

// dateRead (not needed on initial add)

// Story.deleteMany({})

apiRouter.get('/api/stories', (request, response) => {
    response.status(200).json(data)
})

apiRouter.get('/api/stories/:FANDOM', (request, response) => {
    const fandom = request.params.FANDOM
    let result = []

    console.log(fandom)
    result = data[fandom + ' AO3']
    result.concat(data[fandom + ' FFN'])
    
    if (fandom === 'Transformers') {
        result.concat(data[fandom + ' All Media Types'])
        result.concat(data[fandom + ' Prime'])
    }

    response.status(200).json(result)
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
    
    const story = result.filter(r => r.storyID === Number(storyID))[0]
    console.log(story)

    response.status(200).json(story)
})

apiRouter.post('/api/stories', (request, response) => {
    const body = request.body
    console.log(request.body)
    
    if (body !== undefined) {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const formatFile = String(day) + '-' + String(month) + '-' + String(year) + '.json'
    
        const stories = JSON.stringify(body, null, '\t')
        fs.writeFileSync('./stories/' + formatFile, stories)
    
        response.status(200).json({status: 'Success', stories: body})
    }
    else {
        console.log('The request did not include a body')
        response.status(500).json({status: 'Failure', cause: "The request did not include a body"})
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