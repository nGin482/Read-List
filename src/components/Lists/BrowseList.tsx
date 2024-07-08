import { useState, useEffect } from 'react';
import { Button, CardProps, notification, Spin } from 'antd';

import StoryList from './StoryList';
import services from "../../services/services";
import { Collection, IStory } from '../../utils/types';
import './StoryList.css';


const BrowseList = ({ collection }: { collection: Collection }) => {
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

    const addStoryToReadList = (story: IStory) => {
        services.addToReadList(story).then(res => {
            notification.success({
                message: `The story ${story.title} has been added to the Reading List`,
            });
        }).catch(err => {
            notification.error({
                message: `There was a problem adding ${story.title} to the Reading List`,
                description: err?.response?.data.message
            });
        });
    };
    const ignoreStory = (story: IStory) => {
        if (fandomFilter === 'All Stories') {
            notification.error({
                message: `${story.title} cannot be ignored at the moment`,
                description: 'To ignore this story, use the fandom filter located at the top or bottom of the page.'
            });
        }
        else {
            services.ignoreStory(fandomFilter, story.title).then(res => {
                notification.success({
                    message: `The story ${story.title} is now being ignored`,
                });
            }).catch(err => {
                notification.error({
                    message: `There was a problem ignoring ${story.title}`,
                    description: err?.response?.data.message
                });
            });
        }
    };

    const actions = (story: IStory): CardProps['actions'] => [
        <Button
            className="action-story"
            id="add-to-read-list"
            type="primary"
            onClick={() => addStoryToReadList(story)}
        >
            Add to Read List
        </Button>,
        <Button
            className="ignore-story"
            type="primary"
            onClick={() => ignoreStory(story)}
        >
            Ignore Story
        </Button>
    ];
    
    const displayFilters = () => (
        <div id="filter-options">
            <div className="filter-archive">
                <Button onClick={() => setArchiveFilter('Fanfiction.Net')}>Fanfiction.Net</Button>
                <Button onClick={() => setArchiveFilter('Archive of our Own')}>AO3</Button>
                <Button onClick={() => setArchiveFilter('All')}>All</Button>
            </div>
            <div className="filter-fandom">
                {collection?.stories.map(archive => (
                    <Button
                        key={archive.fandom}
                        onClick={() => setFandomFilter(archive.fandom)}
                    >
                        {archive.fandom}
                    </Button>
                ))}
                <Button onClick={() => setFandomFilter('All Stories')}>All</Button>
            </div>
        </div>
    );


    return (
        collection?.stories.length === 0 ? (
            <Spin fullscreen tip="Waiting for stories to load" />
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
                    <StoryList stories={storiesDisplayed} actions={actions} />
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

export default BrowseList;