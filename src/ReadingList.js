import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import services from './services/services.js'
import Story from './Story.js'
import './ReadingList.css';

const ReadingList = () => {
    const [readList, setReadList] = useState([])
    const [readListDefeault, setReadListDefault] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchParameter, setSearchParameter] = useState('')

    useEffect(() => {
        services.getReadingList().then(data => {
            setReadList(data)
            setReadListDefault(data)
        }).catch(err => {
            
        })
    }, []
    )

    const searchReadList = event => {
        event.preventDefault()
        console.log(searchParameter)
        if (searchParameter === 'storyID') {
            setReadList(readList.filter(story => story[searchParameter] === Number(searchValue)))
        }
        else if (searchParameter === 'fandoms') {
            const list = []
            readList.forEach(story => {
                const fandoms = story[searchParameter]
                fandoms.forEach(fandom => {
                    if (fandom.includes(searchValue)) {
                        list.push(story)
                    }
                })
            })
            setReadList(list)
        }
        else {
            setReadList(readList.filter(story => story[searchParameter] === searchValue))
        }
    }
    
    const [displaySearch, setDisplaySearch] = useState(false)
    const displaySearchBox = () => {
        return (
            <div id="reading-list-search-box">
                <button id="close-reading-list-search-box" onClick={() => closeSearchBox()}>Close Search</button>
                <div id="search-criteria">
                    <span id="search-criteria-header">Select how you want to search</span>
                    <button className="search-criteria-options" id="search-by-title" onClick={() => setSearchParameter('title')}>Search by Title</button>
                    <button className="search-criteria-options" id="search-by-title" onClick={() => setSearchParameter('fandoms')}>Search by Fandom</button>
                    <button className="search-criteria-options" id="search-by-title" onClick={() => setSearchParameter('storyID')}>Search by Story ID</button>
                </div>
                {displaySearchOption()}                
                <button id="reset-search" onClick={() => resetSearch()}>Reset Search</button>
            </div>
        )
    }

    const closeSearchBox = () => {
        setDisplaySearch(false)
        resetSearch()
    }

    const displaySearchOption = () => {
        if (searchParameter.includes('title')) {
            return (
                <fieldset id="title-fieldset">
                    <legend id="title-legend">Search by Title</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" className="reading-list-search-input" placeholder="Title" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" value="Search" onClick={() => setSearchParameter('title')}/>
                    </form>
                </fieldset>
            )
        }
        else if (searchParameter.includes('fandoms')) {
            return (
                <fieldset id="fandom-fieldset">
                    <legend id="fandom-legend">Search by Fandom</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" className="reading-list-search-input" placeholder="Fandom" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" value="Search" onClick={() => setSearchParameter('fandoms')}/>
                    </form>
                </fieldset>
            )
        }
        else if (searchParameter.includes('storyID')) {
            return (
                <fieldset id="id-fieldset">
                    <legend id="id-legend">Search by ID</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" className="reading-list-search-input" placeholder="ID" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" value="Search" onClick={() => setSearchParameter('storyID')}/>
                    </form>
                </fieldset>
            )
        }
        else {
            return (
                ''
            )
        }
    }

    const resetSearch = () => {
        setSearchValue('')
        setSearchParameter('')
        setReadList(readListDefeault)

    }

    return (
        <div>
            <h2 id="reading-list-header">Reading List</h2>
            {displaySearch ? displaySearchBox() : <button id="open-reading-list-search-box" onClick={() => setDisplaySearch(true)}>Search for a story</button>}
            <div id="reading-list">
                {readList.map(story => <Story key={story.title} story={story} view={"read-list"}/>)}
            </div>
        </div>
    )
}

export default ReadingList;