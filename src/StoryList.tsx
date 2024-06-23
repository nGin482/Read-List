import { useState, useEffect } from 'react';
import { Button } from 'antd';
import Modal from 'react-modal';

import Story from './components/Story';
import { IStory, Collection } from './utils/types';
import './StoryList.css';


const StoryList = ({ collection }: { collection: Collection }) => {
    const [archiveFilter, setArchiveFilter] = useState('All')
    const [fandomFilter, setFandomFilter] = useState('All Stories');
    const [storiesDisplayed, setStoriesDisplayed] = useState<IStory[]>([]);

    useEffect(() => {
        if (collection) {
            if (fandomFilter === 'All Stories') {
                const archives = collection.stories;
                let stories: IStory[] = [];
                archives.forEach(archive => {
                    stories = stories.concat([...archive.AO3_URL, ...archive?.FFN_URL || []])
                });
                setStoriesDisplayed(stories);
            }
            else {
                const archive = collection.stories.find(arch => arch.fandom === fandomFilter);
                setStoriesDisplayed([...archive?.FFN_URL || [], ...archive.AO3_URL]);
            }
        }
    }, [fandomFilter, collection]);
    
    const displayFilters = () => {
        return (
            <div id="filter-options">
                <div className="filter-archive">
                    <Button onClick={() => setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</Button>
                    <Button onClick={() => setArchiveFilter('Archive of our Own')}>AO3</Button>
                    <Button onClick={() => setArchiveFilter('All')}>All</Button>
                </div>
                <div className="filter-fandom">
                    {collection?.stories.map(archive => archive.fandom).map(fandom => (
                        <Button key={fandom} onClick={() => setFandomFilter(fandom)}>{fandom}</Button>
                    ))}
                    <Button onClick={() => setFandomFilter('All Stories')}>All</Button>
                </div>
            </div>
        );
    };


    return (
        collection?.stories.length === 0 ? (
            <Modal isOpen={true}>Waiting for stories to load ...</Modal>
        )
        : (
            <div id="story-list">
                {displayFilters()}
                <br/>
                <div id='filter-results'>
                    <p><span>Viewing:</span><br/>Stories from {collection?.date}<br/>{fandomFilter} on {archiveFilter}</p><br/>
                    <p id="number"><span>Number of stories:</span><br/>{storiesDisplayed.length}</p>
                </div>
                {storiesDisplayed.length > 0 ? (
                    storiesDisplayed.map((story, idx) => (
                        <Story key={`${story.title}-${idx}`} story={story} view="browsing" fandom={fandomFilter}/>
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
    );
};

export default StoryList;