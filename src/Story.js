import React from 'react';
import './Story.css';

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
            <div className="story-card">
                <h3 id="story-title">{thisStory.title}</h3>
                <dl>
                    <dt>Author:</dt><dd>{thisStory.author}</dd>
                    <dt>Summary:</dt><dd>{thisStory.summary}</dd>
                    <dt>Characters:</dt>
                        {thisStory.characters.length > 0 ? <dd>{thisStory.characters.map(character => <li key={character}>{character}</li>)}</dd> : <dd>No characters were tagged</dd>}
                    <dt>Relationships:</dt>
                        {thisStory.relationships.length > 0 ? <dd>{thisStory.relationships.map(rel => <li key={rel}>{rel}</li>)}</dd> : <dd>No relationships were tagged</dd>}
                    <dt>Fandoms:</dt>
                        {thisStory.fandoms.length > 0 ? <dd>{thisStory.fandoms}</dd> : <dd>No fandoms were tagged</dd>}
                    <dt>Chapters:</dt><dd>{thisStory.chapters}</dd>
                    <dt>Words:</dt><dd>{thisStory.words}</dd>
                    <dt>Published Date:</dt><dd>{thisStory.publishedDate}</dd>
                    <dt>Updated Date:</dt><dd>{thisStory.updatedDate}</dd>
                    <dt>Genres:</dt>
                    {thisStory.genres.length > 0 ? <dd>{thisStory.genres.map(genre => <li key={genre}>{genre}</li>)}</dd> : <dd>No fandoms were tagged</dd>}
                    <dt>Rating:</dt><dd>{thisStory.rating}</dd>
                    <dt>Status:</dt><dd>{thisStory.status}</dd>
                    <dt>Archive:</dt><dd>{thisStory.archive}</dd>
                    <a href={thisStory.url}>Link to this story</a>
                </dl>
            </div>
        )
    }
}

export default Story;