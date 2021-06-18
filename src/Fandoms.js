import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import AddFandom from './AddFandom.js';
import './Fandoms.css';

import ffn_logo from './images/FF.Net_Logo.png'
import ao3_logo from './images/Archive_of_Our_Own_logo.png'

const Fandoms = () => {
    const [fandoms, setFandoms] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    
    const [message, setMessage] = useState('')

    useEffect(() => {
        services.getFandoms().then(data => {
            setFandoms(data)
        })
    }, []
    )

    const openAddModal = () => {
        setOpenAdd(true)
        setMessage('')
    }

    if (fandoms.length !== 0) {
        return (
            <div id="fandoms-page">
                <h2 id="fandoms-page-header">Fandoms</h2>
                <span id="open-add-modal" onClick={() => openAddModal()}>Add a new fandom</span>
                <ul id="fandoms-list">
                    {fandoms.map(fandom => <div key={fandom.fandom} className="fandom-card">
                        <h4 className="fandom-name">{fandom.fandom}</h4>
                        {fandom.FFN !== '' ? <img src={ffn_logo} className="ffn-logo" alt="Stories from Fanfiction.Net are being recorded"/> : ''}
                        {fandom.AO3 !== '' ? <img src={ao3_logo} className="ao3-logo" alt="Stories from Archive of our Own are being recorded"/> : ''}
                        <br/>
                        <span id="open-update-modal" onClick={() => console.log('update fandom')}>Update this fandom</span>
                        </div>
                    )}
                </ul>
                <AddFandom openAdd={openAdd} setOpenAdd={setOpenAdd} message={message} setMessage={setMessage}/>
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