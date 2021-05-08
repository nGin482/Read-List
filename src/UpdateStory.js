import React, {useState} from 'react';
// import services from './services/services.js';
import './UpdateStory.css'

const UpdateStory = ({story}) => {
    const [field, setField] = useState('')
    const [value, setValue] = useState('')
    const [stored, setStored] = useState('')

    const submitUpdate = event => {
        event.preventDefault()
        // if field is n/a or '' or value = '' or stored = ''
        // show modal warning
        const update = {
            field: field,
            value: value,
            stored: stored
        }
        console.log(update)
    }

    return (
        <div id="update-wrapper">
            <h4 id="update-wrapper-title">Update Story</h4>
            <form onSubmit={event => submitUpdate(event)}>
                <select id="data-select" onChange={event => setField(event.target.value)}>
                    <option value="n/a">Select the data to change</option>
                    {Object.keys(story).map(key => <option key={key} value={key}>{key}</option>)}
                </select><br/>
                <input id="data-change" type="text" placeholder="Your change" value={value} onChange={event => setValue(event.target.value)}/><br/>
                Where is this story stored? <br/>
                <input type="radio" id="file" value="File" onClick={event => setStored(event.target.value)}/>In-Memory <br/>
                <input type="radio" id="db" value="DB" onClick={event => setStored(event.target.value)}/>Database
                <input id="update-submit" type="submit" value="Confirm change?"/>
            </form>
        </div>
    )
}

export default UpdateStory;