import { useState } from "react";
import { Button, Card, Modal, notification, Popconfirm } from "antd";

import { StoryDescriptions } from "./StoryDescriptions";
import services from "../../services/services";
import { IStory } from "../../utils/types";
import './Story.css';

interface StoryProps {
    story: IStory,
    view: 'browsing' | 'read-list' | 'stories-read'
    fandom?: string
}

const Story = ({ story, view, fandom }: StoryProps) => {
    const [editingStory, setEditingStory] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    
    const addStoryToReadList = () => {
        services.addToReadList(story).then(res => {
            notification.success({
                message: `The story ${story.title} has been added to the Reading List`,
            });
        }).catch(err => {
            notification.error({
                message: `There was a problem adding ${story.title} to the Reading List`,
                description: err?.response?.data.message
            });
        });
    };
    const removeStoryFromReadList = () => {
        services.removeFromReadList(story.storyID).then(res => {
            notification.success({
                message: `The story ${story.title} has been removed from the Reading List`,
            });
        }).catch(err => {
            notification.error({
                message: `There was a problem removing ${story.title} from the Reading List`,
                description: err?.response?.data.message
            });
        });
    };
    const addStoryToCompleteList = () => {
        services.addtoCompleteList(story.storyID).then(res => {
            notification.success({
                message: `The story ${story.title} has been added to the Completed List`,
            });
        }).catch(err => {
            notification.error({
                message: `There was a problem adding ${story.title} to the Completed List`,
                description: err?.response?.data.message
            });
        });
    };
    const moveStoryBacktoReadingList = () => {
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
    const ignoreStory = () => {
        if (fandom === 'All Stories') {
            notification.error({
                message: `${story.title} cannot be ignored at the moment`,
                description: 'To ignore this story, use the fandom filter located at the top or bottom of the page.'
            });
        }
        else {
            services.ignoreStory(fandom, story.title).then(res => {
                notification.success({
                    message: `The story ${story.title} is now being ignored`,
                });
            }).catch(err => {
                notification.error({
                    message: `There was a problem ignoring ${story.title}`,
                    description: err?.response?.data.message
                });
            });
        }
    };

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

    const storyActions = () => {
        if (view === 'browsing') {
            return [
                <Button
                    className="action-story"
                    id="add-to-read-list"
                    type="primary"
                    onClick={addStoryToReadList}
                >
                    Add to Read List
                </Button>,
                <Button
                    className="ignore-story"
                    type="primary"
                    onClick={ignoreStory}
                >
                    Ignore Story
                </Button>
            ];
        }
        else if (view === 'read-list') {
            if (story.status.includes('Work in Progress')) {
                return [
                    <Button
                        className="action-story"
                        id="mark-as-read"
                        onClick={() => setWarningModal(true)}
                    >
                        Mark Story as Read
                    </Button>,
                    <Button className="action-story" id="remove-from-read-list" onClick={removeStoryFromReadList}>Remove Story from Reading List</Button>
                ];
            }
            else {
                return [
                    <Button className="action-story" id="mark-as-read" onClick={addStoryToCompleteList}>Mark as Read</Button>,
                    <Button className="action-story" id="remove-from-read-list" onClick={removeStoryFromReadList}>Remove Story from Reading List</Button>
                ];
            }
        }
        else if (view === 'stories-read') {
            return [
                <Button className="action-story" id="add-to-read-list" onClick={moveStoryBacktoReadingList}>Move back to Reading List</Button>
            ];
        }
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
                            <Popconfirm
                                title={`Update ${story.title}`}
                                description={`Update ${story.title} with the new information provided?`}
                                okText="Update"
                                onConfirm={updateStory}
                                onCancel={toggleEditing}
                            >
                                <Button type="primary">Update Story</Button>
                            </Popconfirm>
                        ) : (
                            <Button type="primary" onClick={toggleEditing}>Edit Details</Button>
                        ),
                        ...storyActions()
                    ]}
                >
                    <StoryDescriptions story={story} editing={editingStory} />
                </Card>
                {warningModal && (
                    <Modal
                        open={warningModal}
                        onOk={() => {
                            setWarningModal(false);
                            addStoryToCompleteList();
                        }}
                        okText="Yes"
                        onCancel={() => setWarningModal(false)}
                        cancelText="No"
                    >
                        <p className="modal-message" id="story-action-warning">This story suggests it is still a Work in Progress. 
                        Are you sure you want to add it the list of stories read?</p>
                    </Modal>
                )}
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