import React, {useEffect, useState} from 'react';
import {useParams, Link, Redirect} from 'react-router-dom';
import services from './services/services.js';
import Story from './Story.js';

const StoryPage = () => {
    const [story, setStory] = useState(null)
    const storyID = useParams().storyID
    
    useEffect(() => {
        services.getStoriesByID(storyID).then(data => setStory(data))
    }, [])

    if (story) {
        return (
            <Story story={story}/>
        )
    }
    else {
        return <div>The story could not be found</div>
    }
}

export default StoryPage;
