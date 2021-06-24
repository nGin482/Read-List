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
            console.log(list)
        }
        else {
            setReadList(readList.filter(story => story[searchParameter] === searchValue))
        }
    }

    const resetSearch = () => {
        setSearchValue('')
        setSearchParameter('')
        setReadList(readListDefeault)

    }
    // https://betterprogramming.pub/understanding-the-useeffect-dependency-array-2913da504c44

    return (
        <div>
            <h2 id="reading-list-header">Reading List</h2>
            <div id="reading-list-search-box">
                <fieldset id="title-fieldset">
                    <legend id="title-legend">Search by Title</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" placeholder="Title" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" onClick={() => setSearchParameter('title')}/>
                    </form>
                </fieldset>
                <fieldset id="fandom-fieldset">
                    <legend id="fandom-legend">Search by Fandom</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" placeholder="Fandom" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" onClick={() => setSearchParameter('fandoms')}/>
                    </form>
                </fieldset>
                <fieldset id="id-fieldset">
                    <legend id="id-legend">Search by ID</legend>
                    <form onSubmit={searchReadList}>
                        <input type="text" placeholder="ID" onChange={event => setSearchValue(event.target.value)}/>
                        <input type="submit" className="reading-list-search-submit" onClick={() => setSearchParameter('storyID')}/>
                    </form>
                </fieldset>
                <button id="reset-search" onClick={() => resetSearch()}>Reset Search</button>
            </div>
            {readList.map(story => <Story key={story.title} story={story} view={"read-list"}/>)}
        </div>
    )
}

export default ReadingList;