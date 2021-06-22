import React, {useState} from 'react';
import Story from './Story';
import './StoryList.css';
import Modal from 'react-modal';

const StoryList = ({stories}) => {
    const [archiveFilter, setArchiveFilter] = useState('All')
    const [fandomFilter, setFandomFilter] = useState('All Stories')
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
        if (fandomFilter.includes('All') && !fandomFilter.includes('Transformers')) {
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
            <Modal isOpen={true}>Waiting for stories to load ...</Modal>
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
                    <button onClick={() => setFandomFilter('All Stories')}>All</button>
                </div>
                <br/>
                <div id='filter-results'>
                    <p><span>Viewing:</span><br/>Stories from {givenDate}<br/>{fandomFilter} on {archiveFilter}</p><br/>
                    <p id="number"><span>Number of stories:</span><br/>{filterStories().length}</p>
                </div>
                {filterStories().length > 0 ? 
                    filterStories().map(story => 
                    <div>
                        <Story story={story} view={"browsing"}/>
                        <button className="edit-story" key={"edit-"+story.storyID}>
                            <a href={'/story/'+ story.storyID}>Edit Details</a>
                        </button>
                    </div>)
                    :
                    <div id='no-story-warning'>There are no stories to view from this date</div>
                }
                <div id="filter-archive">
                    <button onClick={()=> setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</button>
                    <button onClick={()=> setArchiveFilter('Archive of our Own')}>Archive of our Own</button>
                    <button onClick={()=> setArchiveFilter('All')}>All</button>
                </div>
                <div id="filter-fandom">
                    {allFandoms().map(fandom => <button onClick={() => setFandomFilter(fandom)}>{fandom}</button>)}
                    <button onClick={() => setFandomFilter('All Stories')}>All</button>
                </div>
                <div id="remove-stories">
                    <button onClick={() => console.log('button clicked')}>Finished</button>
                </div>
            </div>
        )
    }
}

export default StoryList;