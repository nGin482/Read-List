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

    if (fandoms.length !== 0) {
        return (
            <div id="fandoms-page">
                <ul id="fandoms-list">
                    {fandoms.map(fandom => <li key={fandom.fandom}>{fandom.fandom}</li>)}
                </ul>
                <span onClick={() => setOpen(true)}>Add a new fandom</span>
                <Modal isOpen={open} id="add-fandom">
    
                    <button id="close-fandom-modal" onClick={() => setOpen(false)}>Close</button>
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