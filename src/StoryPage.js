import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import services from './services/services.js';
import Story from './Story.js';

const StoryPage = () => {
    const [story, setStory] = useState(null)
    const [warning, setWarning] = useState('')
    const storyID = useParams().storyID
    
    useEffect(() => {
        services.getStoriesByID(storyID).then(data => setStory(data)).catch(err => {
            if (err.response.status === 404) {
                setWarning('The story could not be found')
            }
            else {
                setWarning('An error occurred')
            }
        })
    }, [])
    console.log(story)

    if (story) {
        return (
            <Story story={story}/>
        )
    }
    else if (warning !== '') {
        return <div id="story-not-found">The story could not be found</div>
    }
    else {
        return 'Waiting for the story to load ...'
    }
}

export default StoryPage;
