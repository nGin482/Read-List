import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import services from './services/services.js';
import StoryList from './StoryList.js';

const StoriesForDate = () => {
    const date = useParams().date
    console.log(date)
    const [stories, setStories] = useState([])

    useEffect(() => {
        services.getDateStories(date).then(data => {
            setStories(data)
        })
    }, [date]
    )

    return (
        <div>
            <Link to={'/'}>Home</Link>
            <StoryList stories={stories}/>
        </div>
    )
}

export default StoriesForDate;