import { useState, useEffect } from "react";
import { Button, CardProps, notification } from "antd";

import StoryList from "../components/Lists/StoryList";
import services from "../services/services";
import { IStory } from "../utils/types";

const CompletedList = () => {
    const [storiesRead, setStoriesRead] = useState<IStory[]>([]);

    useEffect(() => {
        services.getCompletedList().then(data => setStoriesRead(data));
    }, []);

    const moveStoryBacktoReadingList = (story: IStory) => {
        services.moveBacktoReadList(story.storyID).then(res => {
            notification.success({
                message: `The story ${story.title} has been moved back to the Reading List`,
            });
        }).catch(err => {
            notification.error({
                message: `There was a problem moving ${story.title} back to the Reading List`,
                description: err?.response?.data.message
            });
        });
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
