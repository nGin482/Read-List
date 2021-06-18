import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './AddFandom.css';

const AddFandom = ({openAdd, setOpenAdd, message, setMessage}) => {

    const [fandom, setFandom] = useState('')
    const [ffn_url, setFFN_url] = useState('')
    const [ao3_url, setAO3_url] = useState('')

    const addFandom = (event) => {
        event.preventDefault()
        
        if (fandom !== '' && (ffn_url !== '' || ao3_url !== '')) {
            const fandom_object = {
                fandom: fandom,
                ffn_url: ffn_url,
                ao3_url: ao3_url
            }
            services.addFandom(fandom_object).then(data => {
                setFandom('')
                setFFN_url('')
                setAO3_url('')
                setMessage(data.message)
            }).catch(err => {
                setMessage(err.response.data.message)
            })
        }
        else {
            if (fandom === '' && ffn_url === '' && ao3_url === '') {
                setMessage('The fandom and URL fields must not be blank. Please specify the name of the fandom and provide one or both site URLs.')
            }
            else if (fandom === '' && (ffn_url !== '' || ao3_url !== '')) {
                setMessage('Please specify the name of the fandom before submitting.')
            }
            else if (ffn_url === '' && ao3_url === '') {
                setMessage('Please provide one or both site URLs.')
            }
        }
    }

    return (
        <Modal isOpen={openAdd} id="add-fandom" shouldCloseOnEsc={true}>
            <button id="close-fandom-modal" onClick={() => setOpenAdd(false)}>Close</button>
            <form id="add-fandom-form" onSubmit={addFandom}>
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
                <div id="submit">
                    <input type="submit" id="submit-input" value="Add fandom"/>
                </div>
            </form>
            <p id="add-fandom-warning">{message}</p>
        </Modal>
    )
}

export default AddFandom;