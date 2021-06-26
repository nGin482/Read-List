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
        const fandoms = []
        stories.stories.forEach(fandom => {
            fandoms.push(fandom.fandom)
        })
        return fandoms
    }

    const filterStoriesByFandom = () => {
        const givenCollection = stories.stories
        const filteredStories = []
        if (fandomFilter.includes('All') && !fandomFilter.includes('Transformers')) {
            givenCollection.forEach(fandom => {
                if (fandom.FFN) {
                    if (fandom.FFN.length > 0) {
                        fandom.FFN.forEach(story => {
                            filteredStories.push(story)
                        })
                    }
                }
                if (fandom.AO3) {
                    if (fandom.AO3.length > 0) {
                        fandom.AO3.forEach(story => {
                            filteredStories.push(story)
                        })
                    }
                }
            })
        }
        else {
            const chosenFandom = givenCollection.find(fandom => fandom.fandom === fandomFilter)
            console.log(chosenFandom)
            if (chosenFandom.FFN) {
                if (chosenFandom.FFN.length > 0) {
                    chosenFandom.FFN.forEach(story => {
                        filteredStories.push(story)
                    })
                }
            }
            if (chosenFandom.AO3) {
                if (chosenFandom.AO3.length > 0) {
                    chosenFandom.AO3.forEach(story => {
                        filteredStories.push(story)
                    })
                }
            }
        }
        return filteredStories
    }

    const filterStories = () => {
        return filterStoriesByArchive(filterStoriesByFandom())
    }

    const displayFilters = () => {
        return (
            <div id="filter-options">
                <div id="filter-archive">
                    <button onClick={()=> setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</button>
                    <button onClick={()=> setArchiveFilter('Archive of our Own')}>Archive of our Own</button>
                    <button onClick={()=> setArchiveFilter('All')}>All</button>
                </div>
                <div id="filter-fandom">
                    {allFandoms().map(fandom => <button key={fandom} onClick={() => setFandomFilter(fandom)}>{fandom}</button>)}
                    <button onClick={() => setFandomFilter('All Stories')}>All</button>
                </div>
            </div>
        )
    }

    const displayStories = () => {
        const filteredStories = filterStories()
        if (filteredStories.length > 0) {
            return (
                filteredStories.map(story => 
                    <div>
                        <Story story={story} view={"browsing"}/>
                        <button className="edit-story" key={"edit-"+story.storyID}>
                            <a href={'/story/'+ story.storyID}>Edit Details</a>
                        </button>
                    </div>
                )
            )
        }
        else {
            return (
                <div id='no-story-warning'>There are no stories to view from this date</div>
            )
        }
    }

    if (!stories.stories) {
        return (
            <Modal isOpen={true}>Waiting for stories to load ...</Modal>
        )
    }
    else {
        return (
            <div id="story-list">
                {displayFilters()}
                <br/>
                <div id='filter-results'>
                    <p><span>Viewing:</span><br/>Stories from {givenDate}<br/>{fandomFilter} on {archiveFilter}</p><br/>
                    <p id="number"><span>Number of stories:</span><br/>{filterStories().length}</p>
                </div>
                {displayStories()}
                <br/>
                {displayFilters()}
                <div id="remove-stories">
                    <button onClick={() => console.log('button clicked')}>Finished</button>
                </div>
            </div>
        )
    }
}

export default StoryList;