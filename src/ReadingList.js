import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import services from './services/services.js'
import Story from './Story.js'

const ReadingList = () => {
    const [readList, setReadList] = useState([])

    useEffect(() => {
        services.getReadingList().then(data => {
            setReadList(data)
        }).catch(err => {
            
        })
    }, []
    )

    // https://betterprogramming.pub/understanding-the-useeffect-dependency-array-2913da504c44

    return (
        <div>
            <h3>Reading List</h3>
            <ul>
                {readList.map(story => <Story key={story.title} story={story} view={"read-list"}/>)}
            </ul>
        </div>
    )
}

export default ReadingList;