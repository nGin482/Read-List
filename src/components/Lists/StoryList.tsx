import { Alert, CardProps } from 'antd';

import Story from '../Story';
import { IStory } from '../../utils/types';
import './StoryList.css';

interface StoryListProps {
    stories: IStory[]
    actions: (story: IStory) => CardProps['actions']
}


const StoryList = ({ stories, actions }: StoryListProps) => (
    <div id="story-list">
        {stories.length > 0 ? (
            stories.map((story, idx) => (
                <Story
                    key={`${story.title}-${idx}`}
                    story={story}
                    actions={actions}
                />
            ))
        ) : (
            <Alert
                type="warning"
                message={
                    <h1 style={{ textAlign: 'center' }}>There are no stories to view</h1>
                }
                id="empty-story-list"
            />
        )}
    </div>
);

export default StoryList;