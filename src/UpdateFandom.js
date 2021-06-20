import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './UpdateFandom.css';
import './modal.css';

const UpdateFandom = ({openUpdate, setOpenUpdate, message, setMessage, fandomName}) => {

    const [field, setField] = useState('')
    const [newData, setNewData] = useState('')
    const [search, setSearch] = useState('')

    const updateFandom = (event) => {
        event.preventDefault()

        if (field === 'search') {
            if (search !== '') {
                const updateDetails = {
                    field: field,
                    newData: search
                }
                services.updateFandom(fandomName, updateDetails).then(data => {
                    setField('')
                    setSearch('')
                    setMessage(data.message)
                }).catch(err => {
                    setField('')
                    setSearch('')
                    setMessage(err.response.data.message)
                })
            }
            else {
                setMessage('Please specify how many pages to search')
            }
        }
        else {
            if (field === '') {
                if (newData === '') {
                    setMessage('Please select a data item to change and enter new data before submitting')
                }
                if (newData !== '') {
                    setMessage('Please select a data item to change before submitting')
                }
            }
            else if (newData === '') {
                if (field === '') {
                    setMessage('Please select a data item to change and enter new data before submitting')
                }
                if (field !== '') {
                    setMessage('Please enter new data before submitting')
                }
            }
            else {
                const updateDetails = {
                    field: field,
                    newData: newData
                }
                services.updateFandom(fandomName, updateDetails).then(data => {
                    setField('')
                    setNewData('')
                    setMessage(data.message)
                }).catch(err => {
                    setField('')
                    setNewData('')
                    setMessage(err.response.data.message)
                })
            }
        }
    }


    return (
        <Modal isOpen={openUpdate}>
            <button id="close-fandom-modal" onClick={() => setOpenUpdate(false)}>Close</button>
            <h3 className="header" id="update-header">Update {fandomName}</h3>
            <form className="fandom-form" id="update-fandom-form" onSubmit={updateFandom}>
                <div className="input">
                    <label className="label">Select which data item to change</label>
                    <select id="choose-field" onChange={event => setField(event.target.value)}>
                        <option value="">Choose field</option>
                        <option value="fandom">Fandom name</option>
                        <option value="FFN">Fanfiction.Net URL</option>
                        <option value="AO3">Archive of our own URL</option>
                        <option value="search">Search</option>
                    </select>
                </div>
                {field === 'search' 
                    ? 
                    <div id="container">
                        <div id="clarify-search">
                            <p id="clarify-search-question">Do you want to search just one page or multiple pages?</p>
                            <button className="update-search-options" id="search-one" onClick={() => setSearch('One')}>Just one page</button><br/>
                            <button className="update-search-options" id="search-many" onClick={() => setSearch('Many')}>Multiple pages</button>
                        </div>
                    </div>
                    :
                    <div className="input">
                        <label className="label">Enter the new data here</label>
                        <input type="text" placeholder="New data" onChange={event => setNewData(event.target.value)}/><br/>
                    </div>
                }
                <div id="submit">
                    <input type="submit" id="submit-input" value="Update fandom"/>
                </div>
            </form>
            <p id="update-fandom-message">{message}</p>
        </Modal>
    )
}

export default UpdateFandom;