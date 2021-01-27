import React from 'react';
import './Story.css';

const Story = (story) => {
    const thisStory = story.story
    
    if (story) {
        if (story.story == null) {
            return (
                <div>
                    <h3>Waiting for story to load</h3>
                </div>
            )
        }
        // publishedDate + updatedDate as such until projects uses stories from 21/1/21
        // otherwise as such
        // <dt>Published Date:</dt><dd>{thisStory.publishedDate}</dd>

        // for AO3:
        // tags, warnings, categories

        return (
            <div className="story-card" id={thisStory.title}>
                <h3 id="story-title">{thisStory.title}</h3>
                <dt>Author:</dt><dd>{thisStory.author}</dd>
                <dt>Summary:</dt><dd className='summary-dd'>{thisStory.summary}</dd>
                <div className='characters'>
                    <dt>Characters:</dt>
                    {thisStory.characters.length > 0 ? <dd>{thisStory.characters.map(character => <li key={character}>{character}</li>)}</dd> : <dd>No characters were tagged</dd>}
                </div>
                <div className='relationships'>
                    <dt>Relationships:</dt>
                        {thisStory.relationships.length > 0 ? <dd>{thisStory.relationships.map(rel => <li key={rel}>{rel}</li>)}</dd> : <dd>No relationships were tagged</dd>}
                </div>
                <div className='fandoms'>
                    <dt>Fandoms:</dt>
                        {thisStory.fandoms.length > 0 ? <dd>{thisStory.fandoms.map(fandom => <li key={fandom}>{fandom}</li>)}</dd> : <dd>No fandoms were tagged</dd>}
                </div>
                <dl>
                    <div className="story-details">
                        <div className="chapters">
                            <dt>Chapters:</dt><dd>{thisStory.chapters}</dd>
                        </div>
                        <div className="words">
                            <dt>Words:</dt><dd>{thisStory.words}</dd>
                        </div>

                        {thisStory.publishedDate ? <div className="publishedDate"><dt>Published Date:</dt><dd>{thisStory.publishedDate}</dd></div> : ''}
                        {thisStory.updatedDate ? <div className="updatedDate"><dt>Updated Date:</dt><dd>{thisStory.updatedDate}</dd></div> : ''}
                        {thisStory.date ? <div className="date"><dt>Date:</dt><dd>{thisStory.date}</dd></div> : ''}
                        <div className="rating"><dt>Rating:</dt><dd>{thisStory.rating}</dd></div>
                        <div className="status"><dt>Status:</dt><dd>{thisStory.status}</dd></div>
                    </div>

                    {thisStory.genres ? 
                        <div>
                            <dt>Genres:</dt><dd>{thisStory.genres.length > 0 ? thisStory.genres.map(genre => <li key={genre}>{genre}</li>) : <dd>No genres were tagged</dd>}</dd>
                        </div> : 
                        ''
                    }
                </dl>
                <div className='AO3-tagging'>
                    <div className='warnings'>
                        {thisStory.warnings != null && thisStory.warnings.length > 0 ? 
                            <div>
                                <dt>Warnings:</dt><dd>{thisStory.warnings.map(warning => <li key={warning}>{warning}</li>)}</dd>
                            </div> : 
                            <dd>No warnings were tagged</dd>
                        }
                    </div>

                    <div className='categories'>
                        {thisStory.categories != null && thisStory.categories.length > 0 ? 
                            <div>
                                <dt>Categories:</dt><dd>{thisStory.categories.map(cat => <li key={cat}>{cat}</li>)}</dd>
                            </div> : 
                            <dd>No categories were tagged</dd>
                        }
                    </div>
                    
                    <div className='tags'>
                        {thisStory.tags != null && thisStory.tags.length > 0 ? 
                            <div>
                                <dt>Tags:</dt><dd>{thisStory.tags.map(tag => <li key={tag}>{tag}</li>)}</dd>
                            </div> : 
                            <dd>No tags were added</dd>
                        }
                    </div>
                </div>
                <dt>Archive:</dt><dd>{thisStory.archive}</dd>
                <a href={thisStory.url}>Link to this story</a>
            </div>
        )
    }
}

export default Story;