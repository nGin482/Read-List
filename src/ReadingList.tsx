import { useState, useEffect } from 'react';
import { Button } from 'antd';

import Story from './components/Story';
import SearchBox from './components/SearchForm/index';
import services from './services/services';
import { IStory, SearchOptions } from './utils/types';
import './ReadingList.css';

const ReadingList = () => {
    const [readList, setReadList] = useState<IStory[]>([])
    const [readListDefault, setReadListDefault] = useState<IStory[]>([])
    const [displaySearch, setDisplaySearch] = useState(false);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        services.getReadingList().then(data => {
            setReadListDefault(data)
        }).catch(err => {
            
        })
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
    
    return (
        <>
            <h2 id="reading-list-header">Reading List</h2>
            {displaySearch ? (
                <SearchBox openSearch={displaySearch} setOpenSearch={toggleSearch} searchCallback={searchReadList} />
            ) : (
                <>
                    <Button onClick={() => setSearching(false)}>Reset Search</Button>
                    <button id="open-reading-list-search-box" onClick={toggleSearch}>Search for a story</button>
                </>
            )}
            <div id="reading-list">
                {searching ? (
                    readList.map(story => <Story key={story.title} story={story} view={"read-list"}/>)
                ) : (
                    readListDefault.map(story => <Story key={story.title} story={story} view={"read-list"}/>)
                )}
            </div>
        </>
    );
};

export default ReadingList;
