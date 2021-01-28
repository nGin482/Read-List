import React, {useState} from 'react';
import Story from './Story';

const StoryList = (stories) => {
    return (
        <div>
            {stories.stories.map(story => <Story story={story}/>)}
        </div>
    )
}

export default StoryList;