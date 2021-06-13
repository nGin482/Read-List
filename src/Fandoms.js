import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';

const Fandoms = () => {
    const [fandoms, setFandoms] = useState([])
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        services.getFandoms().then(data => {
            setFandoms(data)
        })
    }, []
    )
    console.log(fandoms)

    return (
        <div id="fandoms-page">
            <ul id="fandoms-list">
                <li>Code Geass</li>
                <li>Doctor Who</li>
                <li>Endeavour</li>
                <li>Lewis</li>
                <li>NCIS</li>
                <li>NCIS: LA</li>
                <li>Person of Interest</li>
                <li>Transformers</li>
            </ul>
            <span onClick={() => setOpen(true)}>Add a new fandom</span>
            <Modal isOpen={open} id="add-fandom">

                <button id="close-fandom-modal" onClick={() => setOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default Fandoms;