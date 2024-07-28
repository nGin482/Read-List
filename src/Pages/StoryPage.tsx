import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notification, Spin } from 'antd';

import Story from '../components/Story/index.js';
// import services from '../services/services.js';
import { IStory } from '../utils/types.js';

const StoryPage = () => {
    const [story, setStory] = useState<IStory>(null);
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        // services.getStoryById(id)
        //     .then(setStory)
        //     .catch(err => {
        //         notification.error({
        //             message: err?.response.status === 404 ? 'The story could not be found' : 'An error occurred'
        //         });
        // });
    }, [id]);

    
    return (
        <>
            {story ? (
                <div id='page-contents'>
                    <Story story={story} />
                </div>
            ) : (
                <Spin fullscreen tip="Waiting for the story to load" />
            )}
        </>
    );
};

export default StoryPage;
