import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import utilFunctions from './utils.js';
import './AddFandom.css';
import './modal.css'

const AddFandom = ({openAdd, setOpenAdd, message, setMessage}) => {

    const [fandom, setFandom] = useState('')
    const [ffn_url, setFFN_url] = useState('')
    const [ao3_url, setAO3_url] = useState('')
    const [search, setSearch] = useState('')

    if (!openAdd) {
        setFandom('')
        setFFN_url('')
        setAO3_url('')
        setSearch('')
    }
    
    const addFandom = (event) => {
        event.preventDefault()

        const checkAddFandom = utilFunctions.checkValidationAddFandom(fandom, ffn_url, ao3_url, search)
        
        if (checkAddFandom.status) {
            const fandom_object = {
                fandom: fandom,
                ffn_url: ffn_url,
                ao3_url: ao3_url,
                search: search
            }
            services.addFandom(fandom_object).then(data => {
                setFandom('')
                setFFN_url('')
                setAO3_url('')
                setSearch('')
                setMessage(data.message)
            }).catch(err => {
                setFandom('')
                setFFN_url('')
                setAO3_url('')
                setSearch('')
                setMessage(err.response.data.message)
            })
        }
        else {
            setMessage(checkAddFandom.message)
        }
    }

    return (
        <Modal isOpen={openAdd} id="add-fandom" shouldCloseOnEsc={true}>
            <button id="close-fandom-modal" onClick={() => setOpenAdd(false)}>Close</button>
            <h3 className="header" id="update-header">Add a new fandom</h3>
            <form className="fandom-form" id="add-fandom-form" onSubmit={addFandom}>
                <div id="columns">
                    <div className="column" id="fandom-details">
                        <div className="input">
                            <label className="input-label">Fandom</label>
                            <input type="text" placeholder="Fandom to be added" onChange={event => setFandom(event.target.value)}/><br/>
                        </div>
                        <div className="input">
                            <label className="input-label">Fanfiction.Net URL</label>
                            <input type="text" placeholder="FFN URL" onChange={event => setFFN_url(event.target.value)}/><br/>
                        </div>
                        <div className="input">
                            <label className="input-label">Archive of our Own URL</label> <input type="text" placeholder="AO3 URL" onChange={event => setAO3_url(event.target.value)}/><br/>
                        </div>
                    </div>
                    <div className="column" id="clarify-search">
                        <p id="clarify-search-question">Do you want to search just one page or multiple pages?</p>
                        <button className="search-options" id="search-one" onClick={() => setSearch('One')}>Just one page</button><br/>
                        <button className="search-options" id="search-many" onClick={() => setSearch('Many')}>Multiple pages</button>
                    </div>
                </div>
                <div id="submit">
                    <input type="submit" id="submit-input" value="Add fandom"/>
                </div>
            </form>
            <p id="add-fandom-warning">{message}</p>
        </Modal>
    )
}

export default AddFandom;