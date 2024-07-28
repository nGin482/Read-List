import { useState, useEffect } from "react";
import { Button, CardProps, notification, Popconfirm } from "antd";

import StoryList from "../components/Lists/StoryList";
import SearchForm from "../components/SearchForm/index";
import { StoriesAPI } from "../services/StoriesAPI";
import { IStory, SearchOptions } from "../utils/types";
import "./styles/ReadingList.css";

const ReadingList = () => {
    const [readList, setReadList] = useState<IStory[]>([])
    const [readListDefault, setReadListDefault] = useState<IStory[]>([])
    const [displaySearch, setDisplaySearch] = useState(false);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        fetchReadingList();
    }, []);

    useEffect(() => {
        if (readListDefault.length > 0) {
            setReadList(readListDefault);
        }
    }, [readListDefault]);

    useEffect(() => {
        if (displaySearch) {
            setSearching(true);
        }
    }, [displaySearch]);

    const fetchReadingList = async () => {
        try {
            const readingList = await StoriesAPI.getReadingList();
            setReadListDefault(readingList);
        }
        catch(error) {
            notification.error({
                message: 'There was a problem getting the Reading list',
                description: error
            });
        }
    };

    const searchReadList = (field: SearchOptions, value: string) => {
        console.log('field: ', field)
        console.log('value: ', value)

        let filteredStories: IStory[];
        if (field === 'title') {
            filteredStories = readList.filter(story => story.title.toLowerCase().includes(value.toLowerCase()));
        }
        else {
            filteredStories = readList.filter(story => story.fandoms.includes(value));
        }
        setReadList(filteredStories);
    };

    const toggleSearch = () => {
        setDisplaySearch(current => !current);
    };

    const removeStoryFromReadList = async (story: IStory) => {
        try {
            const updatedStory = await StoriesAPI.updateReadingStatus(story.storyId, 'shelf');
            setReadListDefault(current => {
                const stories = [...current];
                return stories.filter(story => story.storyId !== updatedStory.storyId);
            });
            notification.success({
                message: `The story ${story.title} has been removed from the Reading List`,
            });
        }
        catch(error) {
            notification.error({
                message: `There was a problem removing ${story.title} from the Reading List`,
                description: error?.response?.data.message
            });
        }
    };
    const addStoryToCompleteList = async (story: IStory) => {
        try {
            const updatedStory = await StoriesAPI.updateReadingStatus(story.storyId, 'complete');
            setReadListDefault(current => {
                const stories = [...current];
                return stories.filter(story => story.storyId !== updatedStory.storyId);
            });
            notification.success({
                message: `The story ${story.title} has been added to the Completed List`,
            });
        }
        catch(error) {
            notification.error({
                message: `There was a problem adding ${story.title} to the Completed List`,
                description: error?.response?.data.message || error.message
            });
        }
    };

    const actions = (story: IStory): CardProps['actions'] => [
        story.status.toLowerCase().includes('progress') ? (
            <Popconfirm
                title={`Add ${story.title} to Reading List?`}
                description={
                    <>
                        <p>This story suggests it is still a work in progress.</p>
                        <p>Are you sure you want to add it to the Completed List?</p>
                    </>
                }
                onConfirm={() => addStoryToCompleteList(story)}
            >
                <Button
                    type="primary"
                    className="action-story"
                    id="mark-as-read"
                >
                    Mark as Read
                </Button>
            </Popconfirm>
        ) : (
            <Button
                type="primary"
                className="action-story"
                id="mark-as-read"
                onClick={() => addStoryToCompleteList(story)}
            >
                Mark as Read
            </Button>
        ),
        <Button
            type="primary"
            className="action-story"
            id="remove-from-read-list"
            onClick={() => removeStoryFromReadList(story)}
        >
            Remove Story from Reading List
        </Button>
    ];
    
    return (
        <>
            <h2 id="reading-list-header">Reading List</h2>
            {displaySearch && (
                <SearchForm openSearch={displaySearch} setOpenSearch={toggleSearch} searchCallback={searchReadList} />
            )}
            <div id="search-controls">
                <Button onClick={() => setSearching(false)}>Reset Search</Button>
                <Button onClick={toggleSearch}>Search for a story</Button>
            </div>
            <div id="reading-list">
                {searching ? (
                    <StoryList stories={readList} actions={actions} />
                ) : (
                    <StoryList stories={readListDefault} actions={actions} />
                )}
            </div>
        </>
    );
};

export default ReadingList;
