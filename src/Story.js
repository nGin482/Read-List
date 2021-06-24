import React, {useState} from 'react';
import services from './services/services';
import Modal from 'react-modal';
import './Story.css';

const Story = ({story, view}) => {
    const [openModal, setOpenModal] = useState(false)
    
    const markStory = () => {
        services.addToReadList(story).then(() => setOpenModal(true))
    }
    
    if (story) {
        if (story == null) {
            return (
                <div>
                    <h3>Waiting for story to load</h3>
                </div>
            )
        }
        // publishedDate + updatedDate as such until projects uses stories from 21/1/21
        // otherwise as such
        // <dt>Published Date:</dt><dd>{story.publishedDate}</dd>

        // for AO3:
        // tags, warnings, categories

        if (openModal) {
            return (
                <Modal isOpen={openModal} id="story-interest-message">
                    <button id="close-fandom-modal" onClick={() => setOpenModal(false)}>Close</button>
                    <p>The story has been added to the read list</p>
                </Modal>
            )
        }
        else {
            return (
                <div className="story-card" id={story.title}>
                    <h3 id="story-title">{story.title}</h3>
                    <dt>Author:</dt><dd>{story.author}</dd>
                    <dt>Summary:</dt><dd className='summary-dd'>{story.summary}</dd>
                    <div className='characters'>
                        <dt>Characters:</dt>
                        {story.characters.length > 0 ? <dd>{story.characters.map(character => <li key={character}>{character}</li>)}</dd> : <dd>No characters were tagged</dd>}
                    </div>
                    <div className='relationships'>
                        <dt>Relationships:</dt>
                            {story.relationships.length > 0 ? <dd>{story.relationships.map(rel => <li key={rel}>{rel}</li>)}</dd> : <dd>No relationships were tagged</dd>}
                    </div>
                    <div className='fandoms'>
                        <dt>Fandoms:</dt>
                            {story.fandoms.length > 0 ? <dd>{story.fandoms.map(fandom => <li key={fandom}>{fandom}</li>)}</dd> : <dd>No fandoms were tagged</dd>}
                    </div>
                    <dl>
                        <div className="story-details">
                            <div className="chapters">
                                <dt>Chapters:</dt><dd>{story.chapters}</dd>
                            </div>
                            <div className="words">
                                <dt>Words:</dt><dd>{story.words}</dd>
                            </div>
    
                            {story.publishedDate ? <div className="publishedDate"><dt>Published Date:</dt><dd>{story.publishedDate}</dd></div> : ''}
                            {story.updatedDate ? <div className="updatedDate"><dt>Updated Date:</dt><dd>{story.updatedDate}</dd></div> : ''}
                            {story.date ? <div className="date"><dt>Date:</dt><dd>{story.date}</dd></div> : ''}
                            <div className="rating"><dt>Rating:</dt><dd>{story.rating}</dd></div>
                            <div className="status"><dt>Status:</dt><dd>{story.status}</dd></div>
                            <div className="archive"><dt>Archive:</dt><dd>{story.archive}</dd></div>
                        </div>
    
                        {story.genres ? 
                            <div>
                                <dt>Genres:</dt><dd>{story.genres.length > 0 ? story.genres.map(genre => <li key={genre}>{genre}</li>) : <dd>No genres were tagged</dd>}</dd>
                            </div> : 
                            ''
                        }
                    </dl>
                    <div className='AO3-tagging'>
                        <div className='warnings'>
                            <dt>Warnings:</dt>
                            {story.warnings != null && story.warnings.length > 0 ? 
                                <div>
                                    <dd>{story.warnings.map(warning => <li key={warning}>{warning}</li>)}</dd>
                                </div> : 
                                <dd>No warnings were tagged</dd>
                            }
                        </div>
    
                        <div className='categories'>
                            <dt>Categories:</dt>
                            {story.categories != null && story.categories.length > 0 ? 
                                <div>
                                    <dd>{story.categories.map(cat => <li key={cat}>{cat}</li>)}</dd>
                                </div> : 
                                <dd>No categories were tagged</dd>
                            }
                        </div>
                        
                        <div className='tags'>
                            <dt>Tags:</dt>
                            {story.tags != null && story.tags.length > 0 ? 
                                <div>
                                    <dd>{story.tags.map(tag => <li key={tag}>{tag}</li>)}</dd>
                                </div> : 
                                <dd>No tags were added</dd>
                            }
                        </div>
                    </div>
                    <a href={story.url}>Link to this story</a>
                    {view === 'browsing' ? 
                        <button className="action-story" id="add-to-read-list" onClick={() => markStory()}>Add to Read List</button> 
                        :
                        <button className="action-story" id="mark-as-read" onClick={() => console.log('This story has been read')}>Mark as Read</button>
                    }
                </div>
            )
        }
    }
}

export default Story;