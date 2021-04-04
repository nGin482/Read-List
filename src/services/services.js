import axios from 'axios'
const storiesURL = '/api/stories/'

const getDateStories = (date) => {
    return axios.get(storiesURL + 'date/' + date).then(response => response.data)
}

const getStoriesByFandom = (fandom) => {
    return axios.get(storiesURL + fandom).then(response => response.data)
}

const getStoriesByID = ID => {
    return axios.get('/api/story/'+ID).then(response => response.data)
}

const getMostRecentStories = () => {
    return axios.get(storiesURL + 'mostRecent').then(response => response.data)
}

const markAsInterested = (story) => {
    console.log(story.storyID)
    return axios.put('/api/story/' + story.storyID + '/interested').then(response => response.data)
}

const removeStories = (date) => {
    return axios.delete('/api/date/' + date).then(response => response.data)
}

const calls = {
    getDateStories,
    getStoriesByFandom,
    getStoriesByID,
    getMostRecentStories,
    markAsInterested,
    removeStories
}

export default calls