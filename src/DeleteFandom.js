import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';
import './DeleteFandom.css'
import './modal.css'

const DeleteFandom = ({fandomName, openDelete, setOpenDelete, message, setMessage}) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    
    if (deleteConfirm) {
        services.deleteFandom(fandomName).then(data => {
            setMessage(data.message)
        }).catch(err => {
            setMessage(err.response.data.message)
        })
    }

    return (
        <Modal isOpen={openDelete} id="delete-fandom-modal">
            <button id="close-fandom-modal" onClick={() => setOpenDelete(false)}>Close</button>
            <h3 className="header" id="delete-header">Delete {fandomName}</h3>
            <p id="delete-fandom-message">Are you sure you want to delete {fandomName} from the archives list?</p>
            <button className="confirm-delete-options" id="confirm-delete-yes" onClick={() => setDeleteConfirm(true)}>Yes</button><br/>
            <button className="confirm-delete-options" id="confirm-delete-no" onClick={() => setOpenDelete(false)}>No</button>
            <p id="delete-fandom-message">{message}</p>
        </Modal>
    )
}

export default DeleteFandom;