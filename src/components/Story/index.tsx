import { useState } from "react";
import { Button, Card, Descriptions, DescriptionsProps, Modal, notification } from "antd";

import services from "../../services/services";
import { IStory } from "../../utils/types";
import './Story.css';

interface StoryProps {
    story: IStory,
    view: 'browsing' | 'read-list' | 'stories-read'
    fandom: string
}

const Story = ({ story, view, fandom }: StoryProps) => {
    const [warningModal, setWarningModal] = useState(false)
    
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
        })
    }
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
        })
    }
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
        })
    }
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
        })
    }
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
            })
        }
    }


    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: 'author',
            label: 'Author',
            children: story.author,
            span: 4
        },
        {
            key: 'summary',
            label: 'Summary',
            children: story.summary,
            span: 4
        },
        {
            key: 'chapters',
            label: 'Chapters',
            children: story.chapters
        },
        {
            key: 'words',
            label: 'Words',
            children: story.words,
            span: 3
        },
        {
            key: 'fandoms',
            label: 'Fandoms',
            children: (
                <ul>
                    {story.fandoms.map(fandom => <li>{fandom}</li>)}
                </ul>
            ),
            span: 3
        },
        {
            key: 'characters',
            label: 'Characters',
            children: (
                <ul>
                    {story.characters.map(character => <li>{character}</li>)}
                </ul>
            ),
            span: 2
        },
        {
            key: 'relationships',
            label: 'Relationships',
            children: (
                story.relationships.length > 0 ? (
                    <ul>
                        {story.relationships.map(ship => <li>{ship}</li>)}
                    </ul>
                ) : (
                    <p>No relationships were tagged</p>
                )
            ),
            span: 2
        },
        {
            key: 'publishedDate',
            label: 'Published Date',
            children: story.publishedDate,
            span: 2
        },
        {
            key: 'updateDate',
            label: 'Updated Date',
            children: story.updatedDate,
            span: 2
        },
        {
            key: 'status',
            label: 'Status',
            children: story.status,
            span: 1
        },
        {
            key: 'rating',
            label: 'Rating',
            children: story.rating,
            span: 2
        },
        {
            key: 'genres',
            label: 'Genres',
            children: (
                story.genres?.length > 0 ? (
                    <ul>
                        {story.genres.map(genre => <li>{genre}</li>)}
                    </ul>
                ) : (
                    <p>No genres were tagged</p>
                )
            )
        },
        {
            key: 'categories',
            label: 'Categories',
            children: (
                story.categories?.length > 0 ? (
                    <ul>
                        {story.categories.map(category => <li>{category}</li>)}
                    </ul>
                ) : (
                    <p>No categories were tagged</p>
                )
            )
        },
        {
            key: 'tags',
            label: 'Tags',
            children: (
                story.tags?.length > 0 ? (
                    <ul>
                        {story.tags.map(tag => <li>{tag}</li>)}
                    </ul>
                ) : (
                    <p>No tags were tagged</p>
                )
            )
        }
    ];
    
    if (!story) {
        return (
            <div>
                <h3>Waiting for story to load</h3>
            </div>
        )
    }
    else {
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
            <>
                <Card
                    className="story-card"
                    actions={[
                        <a href={story.url}>
                            <Button type="primary">View Story</Button>
                        </a>,
                        <a href={`/story/${story.storyID}`}>
                            <Button className="edit-story" type="primary">Edit Details</Button>
                        </a>,
                        ...storyActions()
                    ]}
                >
                    <Descriptions
                        items={descriptionItems}
                        title={story.title}
                        bordered 
                        extra={
                            <Button type="link" href={story.url}>View Story</Button>
                        }
                        labelStyle={{ background: '#7775' }}
                    />
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
        );
    };
}

export default Story;