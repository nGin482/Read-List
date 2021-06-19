import axios from 'axios'
const storiesURL = '/api/stories/'
const storyURL = '/api/story/'

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

const markAsInterested = (story) => {
    console.log(story.storyID)
    return axios.put(storyURL + story.storyID + '/interested').then(response => response.data)
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
    return axios.put('/api/fandom/' + fandomName + '/update', fandomData).then(response => response.data)
}

const getDates = () => {
    return axios.get('/api/dates').then(response => response.data)
}

const requests = {
    getDateStories,
    getStoriesByFandom,
    getStoriesByID,
    getMostRecentStories,
    markAsInterested,
    updateStoryDetails,
    removeStories,
    getFandoms,
    addFandom,
    updateFandom,
    getDates
}

export default requests