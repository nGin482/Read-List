import React, {useState, useEffect} from 'react';
import services from './services/services.js';
import Story from './Story.js';

const CompletedList = () => {
    const [storiesRead, setStoriesRead] = useState([])

    useEffect(() => {
        services.getCompletedList().then(data => {
            console.log(data)
            setStoriesRead(data)
        })
    }, []
    )

    return (
        <div id="stories-read">
            {storiesRead.map(story => <Story key={story.title} story={story} view={'stories-read'}/>)}
        </div>
    )
}

export default CompletedList