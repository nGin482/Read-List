import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import utilFunctions from './utils.js';
import './UpdateFandom.css';
import './modal.css';

const UpdateFandom = ({openUpdate, setOpenUpdate, message, setMessage, fandomName}) => {

    const [field, setField] = useState('')
    const [newData, setNewData] = useState('')

    const updateFandom = (event) => {
        event.preventDefault()

        const checkValidation = utilFunctions.checkValidationUpdateFandom(field, newData)

        if (checkValidation.status) {
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
        else {
            setMessage(checkValidation.message)
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
                        <option value="FFN_URL">Fanfiction.Net URL</option>
                        <option value="AO3_URL">Archive of our own URL</option>
                        <option value="search">Search</option>
                    </select>
                </div>
                {field === 'search' 
                    ? 
                    <div id="container">
                        <div id="clarify-search">
                            <p id="clarify-search-question">Do you want to search just one page or multiple pages?</p>
                            <button className="update-search-options" id="search-one" onClick={() => setNewData('One')}>Just one page</button><br/>
                            <button className="update-search-options" id="search-many" onClick={() => setNewData('Many')}>Multiple pages</button>
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