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
        'Person of Interest', 'Transformers All Media Types', 'Transformers (Cinematic Universe)', 'Transformers Prime']
    }

    const filterStoriesByFandom = () => {
        const givenCollection = stories.stories
        const givenStories = []
        if (fandomFilter === 'All') {
            for (var i = 0; i < givenCollection.length; i++) {
                const archive = givenCollection[i]
                for (var j = 0; j < archive.stories.length; j++) {
                    givenStories.push(archive.stories[j])
                }
            }
        }
        else {
            for (var archiveIdx = 0; archiveIdx < givenCollection.length; archiveIdx++) {
                const archive = givenCollection[archiveIdx]
                if (archive.fandom.includes(fandomFilter)) {
                    for (var storyIdx = 0; storyIdx < archive.stories.length; storyIdx++) {
                        givenStories.push(archive.stories[storyIdx])
                    }
                }
            }
        }
        return givenStories
    }

    const filterStories = () => {
        return filterStoriesByArchive(filterStoriesByFandom())
    }

    if (!stories.stories) {
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
                <br/>
                <div id='filter-results'>
                    <p><span>Viewing:</span><br/>Stories from {givenDate}<br/>{fandomFilter} on {archiveFilter}</p><br/>
                    <p id="number"><span>Number of stories:</span><br/>{filterStories().length}</p>
                </div>
                {filterStories().length > 0 ? filterStories().map(story => <Story story={story}/>) : <div id='no-story-warning'>There are no stories to view from this date</div>}
            </div>
        )
    }
}

export default StoryList;