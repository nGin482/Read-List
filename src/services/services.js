import axios from 'axios'
const storiesURL = '/api/stories/'

const getDateStories = (date) => {
    return axios.get(storiesURL + 'date/' + date).then(response => response.data)
}

const getStoriesByFandom = (fandom) => {
    return axios.get(storiesURL + fandom).then(response => response.data)
}

const getMostRecentStories = () => {
    return axios.get(storiesURL + 'mostRecent').then(response => response.data)
}

export default {
    getDateStories,
    getStoriesByFandom,
    getMostRecentStories
}