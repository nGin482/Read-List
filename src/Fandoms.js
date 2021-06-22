import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import AddFandom from './AddFandom.js';
import UpdateFandom from './UpdateFandom.js';
import DeleteFandom from './DeleteFandom.js';
import './Fandoms.css';

import ffn_logo from './images/FF.Net_Logo.png'
import ao3_logo from './images/Archive_of_Our_Own_logo.png'

const Fandoms = () => {
    const [fandoms, setFandoms] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [fandomName, setFandomName] = useState('')
    
    const [message, setMessage] = useState('')

    useEffect(() => {
        services.getFandoms().then(data => {
            setFandoms(data)
        })
    }, []
    )

    const [search, setSearch] = useState('')

    const openAddModal = () => {
        setOpenAdd(true)
        setMessage('')
    }
    const openUpdateModal = () => {
        setOpenUpdate(true)
        setMessage('')
    }
    const openDeleteModal = () => {
        setOpenDelete(true)
        setMessage('')
    }

    if (fandoms.length !== 0) {
        return (
            <div id="fandoms-page">
                <h2 id="fandoms-page-header">Fandoms</h2>
                <span id="open-add-modal" onClick={() => openAddModal()}>Add a new fandom</span>
                <div id="search-box">
                    <input type="text" placeholder="Search for a fandom" value={search} onChange={event => setSearch(event.target.value)}/>
                </div>
                <ul id="fandoms-list">
                    {fandoms.filter(f => f.fandom.includes(search)).map(fandom => <div key={fandom.fandom} className="fandom-card">
                        <h4 className="fandom-name">{fandom.fandom}</h4>
                        {fandom.FFN !== '' ? <img src={ffn_logo} className="ffn-logo" alt="Stories from Fanfiction.Net are being recorded"/> : ''}
                        {fandom.AO3 !== '' ? <img src={ao3_logo} className="ao3-logo" alt="Stories from Archive of our Own are being recorded"/> : ''}
                        <span id="search-value">{fandom.search === "One" ? 'One page is being searched' : 'Multiple pages are being searched'}</span>
                        <br/>
                        <span id="open-update-modal" onClick={() => {
                            openUpdateModal()
                            setFandomName(fandom.fandom)
                        }}>Update this fandom</span>
                        <span id="open-delete-modal" onClick={() => {
                            openDeleteModal()
                            setFandomName(fandom.fandom)
                        }}>Delete this fandom</span>
                        </div>
                    )}
                </ul>
                <AddFandom openAdd={openAdd} setOpenAdd={setOpenAdd} message={message} setMessage={setMessage}/>
                <UpdateFandom openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} message={message} setMessage={setMessage} fandomName={fandomName}/>
                <DeleteFandom fandomName={fandomName} openDelete={openDelete} setOpenDelete={setOpenDelete} message={message} setMessage={setMessage}/>
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