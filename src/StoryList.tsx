import { CardProps, Spin } from 'antd';

import Story from './components/Story';
import { IStory } from './utils/types';
import './StoryList.css';

interface StoryListProps {
    stories: IStory[]
    actions: (story: IStory) => CardProps['actions']
}


const StoryList = ({ stories, actions }: StoryListProps) => (
    stories.length === 0 ? (
        <Spin fullscreen tip="Waiting for stories to load" />
    )
    : (
        <div id="story-list">
            {stories.map((story, idx) => (
                <Story
                    key={`${story.title}-${idx}`}
                    story={story}
                    view="browsing"
                    actions={actions}
                />
            ))}
        </div>
    )
);

export default StoryList;