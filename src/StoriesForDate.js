import React from 'react';
import { useParams } from 'react-router';
import services from './services/services.js';

const StoriesForDate = () => {
    const date = useParams().date
    console.log(date)

    services.getDateStories(date).then(data => {
        console.log(data);
    })

    return (
        ''
    )
}

export default StoriesForDate;