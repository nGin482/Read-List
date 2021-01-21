import React from 'react';

const Story = (story) => {
    console.log(story)
    const thisStory = story.story
    
    if (story) {
        if (story.story == null) {
            return (
                <div>
                    <h3>Waiting for story to load</h3>
                </div>
            )
        }
        return (
            <div>
                <h3>{thisStory.title}</h3>
                <p>{thisStory.author}</p>
                <p>{thisStory.summary}</p>
                <ul>
                    {thisStory.characters.map(character => <li key={character}>{character}</li>)}
                </ul>
                <p>{thisStory.relationships}</p>
                <p>{thisStory.fandoms}</p>
                <p>{thisStory.chapters}</p>
                <p>{thisStory.words}</p>
                <p>{thisStory.publishedDate}</p>
                <p>{thisStory.updatedDate}</p>
                <p>{thisStory.genres}</p>
                <p>{thisStory.rating}</p>
                <p>{thisStory.status}</p>
                <p>{thisStory.archive}</p>
                <a href={thisStory.url}>Link to this story</a>
            </div>
        )
    }
}

export default Story;