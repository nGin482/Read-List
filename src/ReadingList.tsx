import { useState, useEffect } from 'react';

import Story from './components/Story';
import SearchBox from './components/SearchForm/index';
import services from './services/services';
import { IStory, SearchOptions } from './utils/types';
import './ReadingList.css';

const ReadingList = () => {
    const [readList, setReadList] = useState<IStory[]>([])
    const [readListDefeault, setReadListDefault] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchParameter, setSearchParameter] = useState('')
    const [displaySearch, setDisplaySearch] = useState(false);

    useEffect(() => {
        services.getReadingList().then(data => {
            setReadList(data)
            setReadListDefault(data)
        }).catch(err => {
            
        })
    }, []);

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
        <div>
            <h2 id="reading-list-header">Reading List</h2>
            {displaySearch ? (
                <SearchBox openSearch={displaySearch} setOpenSearch={toggleSearch} searchCallback={searchReadList} />
            ) : (
                <button id="open-reading-list-search-box" onClick={toggleSearch}>Search for a story</button>
            )}
            <div id="reading-list">
                {readList.map(story => <Story key={story.title} story={story} view={"read-list"}/>)}
            </div>
        </div>
    );
};

export default ReadingList;
