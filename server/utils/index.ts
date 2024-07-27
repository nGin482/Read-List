const fs = require('fs')

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { ICollection } from "../../utils/types";

dayjs.extend(customParseFormat);

const readingListPath = './stories/ReadingList/reading-list.json';
const completedListPath = './stories/CompletedList/completed-list.json';

export const convertStringToDate = (date: string) => {
    return dayjs(date, 'DD-MM-YYYY').toDate();
};

const validateAO3Record = record => {
    record.storyID = record.url.substring((record.url.lastIndexOf('/')+1))

    return record
}

const validateFFNRecord = record => {
    const updatedDate = record.updatedDate.split('/')
    record.updatedDate = new Date(new Date().getFullYear(), Number(updatedDate[1])-1, Number(updatedDate[0])+1)
    const publishedDate = record.publishedDate.split('/')
    record.publishedDate = new Date(new Date().getFullYear(), Number(publishedDate[1])-1, Number(publishedDate[0])+1)

    return record
}

export const getAllFiles = (): ICollection[] => {
    const files = fs.readdirSync('./stories');
    const collections = files.filter(file => !file.includes('Reading') && !file.includes('Completed'));
    return collections.map(file => ({
        date: file.substring(0, file.indexOf('.')),
        stories: JSON.parse(fs.readFileSync(`./stories/${file}`))
    }));
};

const getCurrentDate = () => {
    return dayjs().format('DD-MM-YYYY');
}

const stringToDate = (givenDate: string) => {
    return dayjs(givenDate);
}

const findToUpdate = ID => {
    const allCollections = getAllFiles()
    let result = []

    // allCollections.map(day => {
    //     day.stories.map(archive => {
    //         archive.stories.map(story => {
    //             if (story.storyID === ID) {
    //                 result.push({date: day.date, dayCollection: day.stories})
    //             }
    //         })
    //     })
    // })
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
            let day = month[i]
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
    for (let idxDates = 0; idxDates < dates_strings.length; idxDates++) {
        for (idxMonths = 0; idxMonths < months.length; idxMonths++) {
            if (dates_strings[idxDates][1] === months[idxMonths]) {
                months_orderd[idxMonths].push(dates_strings[idxDates])
            }
        }
    }
    return months_orderd
}

const getFandomData = () => {
    return JSON.parse(fs.readFileSync('./archives/archives.json'))
}

const checkFandomAddition = (fandom_given) => {
    const fandoms = getFandomData()

    let flag = false
    
    fandoms.forEach(fandom => {
        if (fandom.fandom === fandom_given) {
            flag = true
        }
    })
    return flag
}

const checkFandomUpdate = (fandomName, field, expected) => {
    const fandoms = getFandomData()

    if (field === 'fandom') {
        const newFandom = fandoms.find(f => f.fandom === expected)
        console.log(newFandom)
        if (newFandom) {
            return true
        }
        else {
            return false
        }
    }
    else {
        const recorded_fandom = fandoms.find(f => f.fandom === fandomName)
        if (recorded_fandom) {
            if (recorded_fandom[field] === expected) {
                console.log('is it this?')
                return true
            }
            else {
                return false
            }
        }
    }
}

const checkFandomDeletion = (fandomName) => {
    // return true if the fandom cannot be found
    // return false if it is found
    
    const fandoms = getFandomData()

    const fandom = fandoms.find(f => f.fandom === fandomName)
    if (fandom) {
        return false
    }
    else {
        return true
    }
}

const writeToInterestedFile = story => {
    const interested = JSON.parse(fs.readFileSync(readingListPath))
    story.storyID = Number(story.storyID)
    interested.push(story)
    fs.writeFileSync(readingListPath, JSON.stringify(interested, null, "\t"))

    const check = checkStoryAdditionInterested(story.title)
    return check
}

const checkStoryAdditionInterested = title => {
    const interested = JSON.parse(fs.readFileSync(readingListPath))
    
    if (interested.find(story => story.title === title)) {
        return true;
    }
    return false;
}

const removeFromReadingListFile = storyID => {
    const readingListFile = JSON.parse(fs.readFileSync(readingListPath))
    const readingListFileUpdated = readingListFile.filter(story => story.storyID !== Number(storyID))
    fs.writeFileSync(readingListPath, JSON.stringify(readingListFileUpdated, null, "\t"))

    const readFileAgain = JSON.parse(fs.readFileSync(readingListPath))
    const check = readFileAgain.find(story => story.storyID === storyID)
    if (!check) {
        return true
    }
    else {
        return false
    }
}

const markStoryAsRead = storyID => {
    const readingListData = JSON.parse(fs.readFileSync(readingListPath))
    const completedListData = JSON.parse(fs.readFileSync(completedListPath))

    const story = readingListData.find(story => story.storyID === Number(storyID))
    completedListData.push(story)
    fs.writeFileSync(completedListPath, JSON.stringify(completedListData, null, "\t"))

    const updatedReadingList = readingListData.filter(story => story.storyID !== Number(storyID))
    fs.writeFileSync(readingListPath, JSON.stringify(updatedReadingList, null, "\t"))

    const check = JSON.parse(fs.readFileSync(completedListPath)).find(story => story.storyID === Number(storyID))

    if (check) {
        return true
    }
    else {
        return false
    }
}

const checkStoryBeforeAddToComplete = storyID => {
    const completedListData = JSON.parse(fs.readFileSync(completedListPath))
    
    if (completedListData.find(story => story.storyID === storyID)) {
        return true;
    }
    return false;
    
    completedListData.forEach(story => {
        if (story.storyID === storyID) {
            return true
        }
    })
    return false
}

const moveStoryBacktoReadingList = storyID => {
    const readingListData = JSON.parse(fs.readFileSync(readingListPath))
    const completedListData = JSON.parse(fs.readFileSync(completedListPath))

    const story = completedListData.find(story => story.storyID === storyID)
    readingListData.push(story)
    fs.writeFileSync(readingListPath, JSON.stringify(readingListData, null, "\t"))

    const updatedCompleteList = completedListData.filter(story => story.storyID !== storyID)
    fs.writeFileSync(completedListPath, JSON.stringify(updatedCompleteList, null, "\t"))
}

// module.exports = {
//     validateAO3Record,
//     validateFFNRecord,
//     getAllFiles,
//     getCurrentDate,
//     stringToDate,
//     findToUpdate,
//     getAllDates,
//     getFandomData,
//     checkFandomAddition,
//     checkFandomUpdate,
//     checkFandomDeletion,
//     writeToInterestedFile,
//     removeFromReadingListFile,
//     markStoryAsRead,
//     checkStoryBeforeAddToComplete,
//     moveStoryBacktoReadingList
// }