import axios from 'axios';

import { Collection, IStory } from '../utils/types';
import { FandomArchive } from '../../types';

const BASE_URL = 'http://localhost:3001/api';

const storiesURL = `${BASE_URL}/stories/`;
const storyURL = `${BASE_URL}/story/`
const fandomsURL = `${BASE_URL}/fandoms/`
const readListURL = `${BASE_URL}/reading-list/`
const completedListURL = `${BASE_URL}/completed-list/`

const getStoriesByDate = async (date: string) => {
    const response = await axios.get<Collection>(`${storiesURL}date/${date}`);
    if (response.status === 200) {
        return response.data;
    }
}

const getStoriesByFandom = (fandom) => {
    return axios.get(storiesURL + fandom).then(response => response.data)
}

const getStoryById = async (id: string) => {
    return axios.get<IStory>(`${storyURL}${id}`).then(response => response.data)
}

const getMostRecentStories = () => {
    return axios.get<Collection>(storiesURL + 'mostRecent').then(response => response.data)
}

const updateStoryDetails = (story: IStory) => {
    return axios.put(`/api/update/${story.storyID}`, story).then(response => response.data)
}

const removeStories = (date) => {
    return axios.delete('/api/date/' + date).then(response => response.data)
}

const getFandoms = () => {
    return axios.get(fandomsURL).then(response => response.data)
}

const addFandom = async (fandom_data: FandomArchive) => {
    return axios.post(`${fandomsURL}add`, fandom_data).then(response => response.data);
};

const updateFandom = (fandom: FandomArchive) => {
    return axios.put(`${fandomsURL}${fandom.name}/update`, fandom).then(response => response.data)
}

const deleteFandom = async (fandomName: string) => {
    return axios.delete(`${fandomsURL}${fandomName}/delete`).then(response => response.data)
};

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
    return axios.post(completedListURL + storyID).then(response => response.data)
}

const moveBacktoReadList = storyID => {
    return axios.delete(completedListURL + storyID).then(response => response.data)
}

const ignoreStory = (fandom, title) => {
    return axios.post(fandomsURL + fandom + '/ignore', {title: title}).then(response => response.data)
}

const getDates = () => {
    return axios.get<string[][]>(`${BASE_URL}/dates`).then(response => response.data)
}

const requests = {
    getStoriesByDate,
    getStoriesByFandom,
    getStoryById,
    getMostRecentStories,
    updateStoryDetails,
    removeStories,
    getFandoms,
    addFandom,
    updateFandom,
    deleteFandom,
    ignoreStory,
    getReadingList,
    addToReadList,
    removeFromReadList,
    getCompletedList,
    addtoCompleteList,
    moveBacktoReadList,
    getDates
}

export default requests