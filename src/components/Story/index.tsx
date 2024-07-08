import { useState } from "react";
import { Button, Card, CardProps, notification } from "antd";

import { StoryDescriptions } from "./StoryDescriptions";
import services from "../../services/services";
import { IStory } from "../../utils/types";
import "./Story.css";

interface StoryProps {
    story: IStory,
    view: 'browsing' | 'read-list' | 'stories-read'
    actions: (story: IStory) => CardProps['actions']
}

const Story = ({ story, view, actions }: StoryProps) => {
    const [editingStory, setEditingStory] = useState(false);


    const updateStory = async () => {
        try {
            const response = await services.updateStoryDetails(story);
            notification.success({
                message: `${story.title} has been updated!`
            });
        }
        catch(error) {
            notification.error({
                message: `There was a problem updating ${story.title}!`,
                description: error.response.data
            });
        }
    };

    const toggleEditing = () => {
        setEditingStory(current => !current);
    };

    return (
        story ? (
            <>
                <Card
                    className="story-card"
                    actions={[
                        <a href={story.url}>
                            <Button type="primary">View Story</Button>
                        </a>,
                        editingStory ? (
                            <div className="edit-story-actions">
                                <Button onClick={toggleEditing}>Cancel</Button>
                                <Button type="primary" onClick={updateStory}>Update Story</Button>
                            </div>
                        ) : (
                            <Button type="primary" onClick={toggleEditing}>Edit Details</Button>
                        ),
                        ...actions(story)
                    ]}
                >
                    <StoryDescriptions story={story} editing={editingStory} />
                </Card>
            </>
        )
        : (
            <div>
                <h3>Waiting for story to load</h3>
            </div>
        )
    );
}

export default Story;