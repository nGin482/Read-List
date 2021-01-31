import React, {useState} from 'react';
import Story from './Story';
import './StoryList.css';
// import Modal from 'react-modal';
// date and filter
// https://www.npmjs.com/package/react-modal
// http://reactcommunity.org/react-modal/

const StoryList = ({stories}) => {
    const [archiveFilter, setArchiveFilter] = useState('All')
    const [fandomFilter, setFandomFilter] = useState('All')
    const givenStories = stories.stories
    const givenDate = stories.date
    
    const filterStoriesByArchive = (stories) => {
        if (archiveFilter === 'All') {
            return stories
        }
        return stories.filter(story => story.archive === archiveFilter)   
    }

    const allFandoms = () => {
        // use route when implemented
        return ['Code Geass', 'Doctor Who', 'Endeavour', 'Lewis', 'NCIS', 'NCIS: Los Angeles', 
        'Person of Interest', 'Transformers - All Media Types', 'Transformers (Bay Movies)', 'Transformers: Prime']
    }
    const filterStoriesByFandom = () => {
        if (fandomFilter === 'All') {
            return givenStories
        }
        else {
            const result = []
            for (var i = 0; i < givenStories.length; i++) {
                const story = givenStories[i]
                const storyFandoms = story.fandoms
                for (var idx = 0; idx < storyFandoms.length; idx++) {
                    if (storyFandoms[idx] === fandomFilter) {
                        result.push(story)
                    }
                }
            }
            return result
        }
    }

    const filterStories = () => {
        return filterStoriesByArchive(filterStoriesByFandom())
    }

    if (!givenStories) {
        return (
            <div><p>Waiting for stories to load ...</p></div>
        )
    }
    else {
        return (
            <div id="story-list">
                <div id="filter-archive">
                    <button onClick={()=> setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</button>
                    <button onClick={()=> setArchiveFilter('Archive of our Own')}>Archive of our Own</button>
                    <button onClick={()=> setArchiveFilter('All')}>All</button>
                </div>
                <div id="filter-fandom">
                    {allFandoms().map(fandom => <button onClick={() => setFandomFilter(fandom)}>{fandom}</button>)}
                    <button onClick={() => setFandomFilter('All')}>All</button>
                </div>
                <dt>Viewing:</dt><dd>{givenDate}</dd><dd>{fandomFilter} on {archiveFilter}</dd>
                <dt>Number of stories:</dt><dd>{filterStories().length}</dd>
                {filterStories().map(story => <Story story={story}/>)}
            </div>
        )
    }
}

export default StoryList;