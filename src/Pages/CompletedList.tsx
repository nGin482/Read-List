import { useState, useEffect } from "react";
import { Button, CardProps, notification } from "antd";

import StoryList from "../components/Lists/StoryList";
import { StoriesAPI } from "../services/StoriesAPI";
import { IStory } from "../utils/types";

const CompletedList = () => {
    const [storiesRead, setStoriesRead] = useState<IStory[]>([]);

    useEffect(() => {
        StoriesAPI.getCompletedList()
            .then(setStoriesRead)
            .catch(err => {
                notification.error({
                    message: 'There was a problem retrieving the Completed List'
                })
            })
    }, []);

    const moveStoryBacktoReadingList = async (story: IStory) => {
        try {
            await StoriesAPI.updateReadingStatus(story.storyId, 'reading-list');
            setStoriesRead(current => [...current.filter(storyRead => storyRead.storyId !== story.storyId)]);
            notification.success({
                message: `The story ${story.title} has been moved back to the Reading List`,
            });
        }
        catch(error) {
            notification.error({
                message: `There was a problem moving ${story.title} back to the Reading List`,
                description: error?.response?.data.message || error.message
            });
        }
    };

    const actions = (story: IStory): CardProps['actions'] => [
        <Button
            className="action-story"
            id="add-to-read-list"
            onClick={() => moveStoryBacktoReadingList(story)}
        >
            Move back to Reading List
        </Button>
    ];

    return (
        <StoryList stories={storiesRead} actions={actions} />
    );
};

export default CompletedList;
