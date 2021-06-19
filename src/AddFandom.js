import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './AddFandom.css';
import './modal.css'

const AddFandom = ({openAdd, setOpenAdd, message, setMessage}) => {

    const [fandom, setFandom] = useState('')
    const [ffn_url, setFFN_url] = useState('')
    const [ao3_url, setAO3_url] = useState('')

    const addFandom = (event) => {
        event.preventDefault()
        let approved = true

        const checkValidURL = (url) => {
            if (!url.includes('https://')) {
                setMessage('This is not a valid URL. Please make sure the given details is valid before submitting')
                approved = false
            }
        }
        const checkValidFFNURL = () => {
            if (!ffn_url.includes('fanfiction.net')) {
                setMessage('This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting')
                approved = false
            }
        }
        const checkValidAO3URL = () => {
            if (!ao3_url.includes('archiveofourown.org')) {
                setMessage('This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting')
                approved = false
            }
        }
        const checkBothValidURLs = () => {
            if (!ffn_url.includes('https://') && ao3_url.includes('https://')) {
                setMessage('The URL given for Fanfiction.Net is not valid. Please make sure the given details is valid before submitting')
                approved = false
            }
            else if (ffn_url.includes('https://') && !ao3_url.includes('https://')) {
                setMessage('The URL given for Archive of our Own is not valid. Please make sure the given details is valid before submitting')
                approved = false
            }
            else if (!ffn_url.includes('https://') && !ao3_url.includes('https://')) {
                setMessage('The URLs given for both sites are not valid. Please make sure the given details is valid before submitting')
                approved = false
            }
            else {
                if (!ffn_url.includes('fanfiction.net') && ao3_url.includes('archiveofourown.org')) {
                    setMessage('This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting')
                    approved = false
                }
                else if (ffn_url.includes('fanfiction.net') && !ao3_url.includes('archiveofourown.org')) {
                    setMessage('This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting')
                    approved = false
                }
                else if (!ffn_url.includes('fanfiction.net') && !ao3_url.includes('archiveofourown.org')) {
                    setMessage('The Fanfiction.Net and the Archive of our Own URLs given do not come from their respective sites. Please make sure they are correct URLs before submitting')
                    approved = false
                }
            }
        }
        
        if (fandom !== '' && (ffn_url !== '' || ao3_url !== '')) {
            if (ffn_url !== '') {
                checkValidURL(ffn_url)
                checkValidFFNURL()
            }
            if (ao3_url !== '') {
                checkValidURL(ao3_url)
                checkValidAO3URL()
            }
            if (ffn_url !== '' && ao3_url !== '') {
                checkBothValidURLs()
            }
            if (approved) {
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
            <h3 className="header" id="update-header">Add a new fandom</h3>
            <form className="fandom-form" id="add-fandom-form" onSubmit={addFandom}>
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