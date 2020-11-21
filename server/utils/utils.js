const validateAO3Record = record => {
    record.chapters = record.chapters.substring(0, record.chapters.indexOf('/'))
    record.words = Number(record.words.replace(',', ''))
    record.storyID = record.url.substring((record.url.lastIndexOf('/')+1))
    console.log(record.date.split('/'))
    updatedDate = record.date.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)
    record.collectedDate = Date.now()

    return record
}

const validateFFNRecord = (record, fandom) => {
    record.words = Number(record.words.replace(',', ''))
    record.relationships = record.characters.pairings
    record.characters = record.characters.characters
    record.title = record.title
    record.archive = 'Fanfiction.Net'
    updatedDate = record.updatedDate.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)
    console.log(record.publishedDate)
    publishedDate = record.publishedDate.split('/')
    record.publishedDate = new Date(new Date().getFullYear(), Number(publishedDate[1])-1, Number(publishedDate[0])+1)
    record.collectedDate = Date.now()
    record.fandom = fandom

    return record
}

module.exports = {
    validateAO3Record,
    validateFFNRecord
}