import axios from 'axios'
const storiesURL = '/api/stories/'
const storyURL = '/api/story/'
const readListURL = '/api/reading-list/'
const completedListURL = '/api/completed-list/'

const getDateStories = (date) => {
    return axios.get(storiesURL + 'date/' + date).then(response => response.data)
}

const getStoriesByFandom = (fandom) => {
    return axios.get(storiesURL + fandom).then(response => response.data)
}

const getStoriesByID = ID => {
    return axios.get(storyURL + ID).then(response => response.data)
}

const getMostRecentStories = () => {
    return axios.get(storiesURL + 'mostRecent').then(response => response.data)
}

const updateStoryDetails = (story) => {
    return axios.put('/api/update/' + story.storyID, story).then(response => response.data)
}

const removeStories = (date) => {
    return axios.delete('/api/date/' + date).then(response => response.data)
}

const getFandoms = () => {
    return axios.get('/api/fandoms').then(response => response.data)
}

const addFandom = (fandom_data) => {
    return axios.post('/api/fandoms/add', fandom_data).then(response => response.data)
}

const updateFandom = (fandomName, fandomData) => {
    return axios.put('/api/fandoms/' + fandomName + '/update', fandomData).then(response => response.data)
}

const deleteFandom = (fandomName) => {
    return axios.delete('/api/fandoms/' + fandomName + '/delete').then(response => response.data)
}

const getReadingList = () => {
    return axios.get(readListURL).then(response => response.data)
}

const addToReadList = (story) => {
    return axios.post(readListURL + story.storyID).then(response => response.data)
}

const removeFromReadList = storyID => {
    return axios.delete(readListURL + storyID).then(response => response.data)
}

const getCompletedList = () => {
    return axios.get(completedListURL).then(response => response.data)
}

const addtoCompleteList = storyID => {
    return axios.put(completedListURL, {storyID: storyID}).then(response => response.data)
}

const getDates = () => {
    return axios.get('/api/dates').then(response => response.data)
}

const requests = {
    getDateStories,
    getStoriesByFandom,
    getStoriesByID,
    getMostRecentStories,
    updateStoryDetails,
    removeStories,
    getFandoms,
    addFandom,
    updateFandom,
    deleteFandom,
    getReadingList,
    addToReadList,
    removeFromReadList,
    getCompletedList,
    addtoCompleteList,
    getDates
}

export default requests