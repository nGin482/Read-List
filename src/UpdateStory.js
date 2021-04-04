import React, {useState} from 'react';
import services from './services/services.js';
import './UpdateStory.css'

const UpdateStory = ({story}) => {
    const [field, setField] = useState('')
    const [data, setData] = useState('')
    const [stored, setStored] = useState('')
    
    const handleFieldChange = event => {
        event.preventDefault()
        setField(event.target.value)
    }
    const handleDataChange = event => {
        event.preventDefault()
        setData(event.target.value)
    }

    return (
        <div id="update-wrapper">
            <h4 id="update-wrapper-title">Update Story</h4>
            <select id="data-select" onChange={event => handleFieldChange(event)}>
                <option>Select the data to change</option>
                {Object.keys(story).map(key => <option key={key} value={key}>{key}</option>)}
            </select><br/>
            <input id="data-change" type="text" placeholder="Your change" value={data} onChange={event => handleDataChange(event)}/><br/>
            Location stored:
            <input type="radio" id="file" value="File" onClick={event => setStored(event.target.value)}/>File
            <input type="radio" id="db" value="Database" onClick={event => setStored(event.target.value)}/>Database
            <input id="update-submit" type="submit" value="Confirm change?"/>
        </div>
    )
}

export default UpdateStory;