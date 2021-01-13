import axios from 'axios'
const storiesURL = '/api/stories/'

const getDateStories = (date) => {
    return axios.get(storiesURL + 'date/' + date).then(response => response.data)
}

const getStoriesByFandom = (fandom) => {
    return axios.get(storiesURL + fandom).then(response => response.data)
}

export default {
    getDateStories,
    getStoriesByFandom
}