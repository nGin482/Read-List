import React, {useState} from 'react';
import Story from './Story';

const StoryList = (stories) => {
    const [archiveFilter, setArchiveFilter] = useState('')
    
    const filterStoriesByArchive = () => {
        return stories.stories.filter(story => story.archive === archiveFilter)   
    }

    return (
        <div id="story-list">
            <button onClick={()=> setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</button>
            <button onClick={()=> setArchiveFilter('Archive of our Own')}>Archive of our Own</button>
            {filterStoriesByArchive().map(story => <Story story={story}/>)}
        </div>
    )
}

export default StoryList;