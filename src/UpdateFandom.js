import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './UpdateFandom.css';

const UpdateFandom = ({openUpdate, setOpenUpdate, message, setMessage, fandomName}) => {

    const [field, setField] = useState('')
    const [newData, setNewData] = useState('')

    const updateFandom = (event) => {
        event.preventDefault()

        if (field !== '' && newData !== '' && fandomName !== '') {
            const updateDetails = {
                field: field,
                newData: newData
            }
            services.updateFandom(fandomName, updateDetails).then(data => {
                setField('')
                setNewData('')
                setMessage(data.message)
            }).catch(err => {
                setMessage(err.response.data.message)
            })
        }
        else if (field === '' && newData !== '') {
            setMessage('Please select a data item to change before submitting')
        }
        else if (field !== '' && newData === '') {
            setMessage('Please enter new data before submitting')
        }
        else {
            setMessage('Please select a data item to change and enter new data before submitting')
        }
    }


    return (
        <Modal isOpen={openUpdate}>
            <button id="close-fandom-modal" onClick={() => setOpenUpdate(false)}>Close</button>
            <form id="update-fandom-form" onSubmit={updateFandom}>
                <div className="input">
                    <label className="label">Select which data item to change</label>
                    <select id="choose-field" onChange={event => setField(event.target.value)}>
                        <option value="">Choose field</option>
                        <option value="fandom">Fandom name</option>
                        <option value="FFN">Fanfiction.Net URL</option>
                        <option value="AO3">Archive of our own URL</option>
                    </select>
                </div>
                <div className="input">
                    <label className="label">Enter the new data here</label>
                    <input type="text" placeholder="New data" onChange={event => setNewData(event.target.value)}/><br/>
                </div>
                <div id="submit">
                    <input type="submit" id="submit-input" value="Update fandom"/>
                </div>
            </form>
            <p id="update-fandom-message">{message}</p>
        </Modal>
    )
}

export default UpdateFandom;