import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import Story from './Story';
import { IStory, Collection } from './utils';
import './StoryList.css';


const StoryList = ({ collection }: { collection: Collection }) => {
    const [archiveFilter, setArchiveFilter] = useState('All')
    const [fandomFilter, setFandomFilter] = useState('All Stories');
    const [storiesDisplayed, setStoriesDisplayed] = useState<IStory[]>([]);

    useEffect(() => {
        if (collection) {
            if (fandomFilter === 'All Stories') {
                const archives = collection.stories;
                console.log('oi')
                let stories: IStory[] = [];
                archives.forEach(archive => {
                    console.log([...archive.AO3_URL, ...archive?.FFN_URL || []])
                    stories = stories.concat([...archive.AO3_URL, ...archive?.FFN_URL || []])
                });
                console.log(stories)
                setStoriesDisplayed(stories)
                // archives.forEach(archive => {
                //     console.log([...archive.AO3_URL, ...archive?.FFN_URL || []].length)
                //     setStoriesDisplayed([...archive.AO3_URL, ...archive?.FFN_URL || []]);
                // });
            }
            else {
                const archive = collection.stories.find(arch => arch.fandom === fandomFilter);
                console.log(archive)
                setStoriesDisplayed([...archive?.FFN_URL || [], ...archive.AO3_URL]);
            }
        }
        console.log(fandomFilter, fandomFilter === 'All Stories')
    }, [fandomFilter]);

    useEffect(() => {
        console.log(storiesDisplayed.length)
    }, [storiesDisplayed])
    
    const allFandoms = () => {
        return collection.stories.map(archive => archive.fandom);
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

    if (!collection?.stories) {
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
                    <p><span>Viewing:</span><br/>Stories from {collection.date}<br/>{fandomFilter} on {archiveFilter}</p><br/>
                    <p id="number"><span>Number of stories:</span><br/>{storiesDisplayed.length}</p>
                </div>
                {storiesDisplayed.length > 0 ? (
                    storiesDisplayed.map(story => (
                        <div key={story.title}>
                            <Story story={story} view={"browsing"} fandom={fandomFilter}/>
                            <button className="edit-story" key={"edit-"+story.id}>
                                <a href={'/story/'+ story.id}>Edit Details</a>
                            </button>
                        </div>
                    ))
                ) : (
                    <div id='no-story-warning'>There are no stories to view from this date</div>
                )}
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