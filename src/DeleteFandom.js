import React, {useState} from 'react';
import Modal from 'react-modal';
import services from './services/services.js';

const DeleteFandom = ({fandomName, openDelete, setOpenDelete, message, setMessage}) => {
    const [message2, setMessage2] = useState('')

    const [deleteConfirm, setDeleteConfirm] = useState(false)
    setMessage('Are you sure you want to delete ' + fandomName + ' from the archives list?')

    if (deleteConfirm) {
        services.deleteFandom(fandomName).then(data => {
            setMessage2(data.message)
        }).catch(err => {
            setMessage2(err.response.data.message)
        })
    }
    
    return (
        <Modal isOpen={openDelete} id="delete-fandom-modal">
            <button id="close-fandom-modal" onClick={() => setOpenDelete(false)}>Close</button>
            <h3 className="header" id="delete-header">Delete {fandomName}</h3>
            <p id="delete-fandom-message">{message}</p>
            <button className="confirm-delete-options" id="confirm-delete" onClick={() => setDeleteConfirm(true)}>Yes</button>
            <button className="confirm-delete-options" id="confirm-delete">No</button>
            <p id="delete-fandom-message2">{message2}</p>
        </Modal>
    )
}

export default DeleteFandom;