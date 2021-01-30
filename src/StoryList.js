import React, {useState} from 'react';
import Story from './Story';
import './StoryList.css';

const StoryList = (stories) => {
    const [archiveFilter, setArchiveFilter] = useState('All')
    const [fandomFilter, setFandomFilter] = useState('All')
    
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
            return stories.stories
        }
        const matchFandomValues = (fandoms) => {
            var idx = -1
            fandoms.map(fandom => {
                idx = fandom.indexOf(fandomFilter)
                return ''
            })
            if (idx === -1) {
                return false
            }
            else {
                return true
            }
        }
        return stories.stories.filter(story => matchFandomValues(story.fandoms))
    }

    const filterStories = () => {
        return filterStoriesByArchive(filterStoriesByFandom())
    }

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
            {filterStories().map(story => <Story story={story}/>)}
        </div>
    )
}

export default StoryList;