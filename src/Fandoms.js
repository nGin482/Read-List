import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './Fandoms.css';

import ffn_logo from './images/FF.Net_Logo.png'
import ao3_logo from './images/Archive_of_Our_Own_logo.png'

const Fandoms = () => {
    const [fandoms, setFandoms] = useState([])
    const [open, setOpen] = useState(false)
    
    const [message, setMessage] = useState('')

    useEffect(() => {
        services.getFandoms().then(data => {
            setFandoms(data)
        })
    }, []
    )

    const openModal = () => {
        setOpen(true)
        setMessage('')
    }
    
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

    if (fandoms.length !== 0) {
        return (
            <div id="fandoms-page">
                <h2 id="fandoms-page-header">Fandoms</h2>
                <span id="open-add-modal" onClick={() => openModal()}>Add a new fandom</span>
                <ul id="fandoms-list">
                    {fandoms.map(fandom => <div key={fandom.fandom} className="fandom-card">
                        <h4 className="fandom-name">{fandom.fandom}</h4>
                        {fandom.FFN !== '' ? <img src={ffn_logo} className="ffn-logo" alt="Stories from Fanfiction.Net are being recorded"/> : ''}
                        {fandom.AO3 !== '' ? <img src={ao3_logo} className="ao3-logo" alt="Stories from Archive of our Own are being recorded"/> : ''}
                        </div>
                    )}
                </ul>
                <Modal isOpen={open} id="add-fandom">
                    <button id="close-fandom-modal" onClick={() => setOpen(false)}>Close</button>
                    <form id="add-fandom-form" onSubmit={addFandom}>
                        Fandom <input type="text" placeholder="Fandom to be added" onChange={event => setFandom(event.target.value)}/><br/>
                        Fanfiction.Net URL <input type="text" placeholder="FFN URL" onChange={event => setFFN_url(event.target.value)}/><br/>
                        Archive of our Own URL <input type="text" placeholder="AO3 URL" onChange={event => setAO3_url(event.target.value)}/><br/>
                        <input type="submit" id="submit" value="Add fandom"/>
                    </form>
                    <p id="add-fandom-warning">{message}</p>
                </Modal>
            </div>
        )
    }
    else {
        return (
            <Modal isOpen={true}>Waiting for the fandoms to be retrieved</Modal>
        )
    }
}

export default Fandoms;