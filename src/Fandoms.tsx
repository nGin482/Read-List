import { useState, useEffect } from 'react';
import { Button, Card, Image, Input, Spin, Typography } from 'antd';

import services from './services/services.js';
import AddFandom from './AddFandom.js';
import UpdateFandom from './UpdateFandom.js';
import DeleteFandom from './DeleteFandom.js';
import { FandomArchive } from '../types/index.js';
import './Fandoms.css';

import ffn_logo from './images/FF.Net_Logo.png'
import ao3_logo from './images/Archive_of_Our_Own_logo.png'

const Fandoms = () => {
    const [fandoms, setFandoms] = useState<FandomArchive[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [fandomName, setFandomName] = useState('');
    const [fandomSearch, setFandomSearch] = useState('');
    const [message, setMessage] = useState('')

    const { Link, Text } = Typography;

    useEffect(() => {
        services.getFandoms().then((data: FandomArchive[]) => {
            setFandoms(data)
        })
    }, []);


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
                    <Input
                        placeholder="Search for a fandom"
                        value={fandomSearch}
                        onChange={event => setFandomSearch(event.target.value.toLocaleLowerCase())}
                    />
                </div>
                {fandoms.filter(fandom => fandom.name.toLocaleLowerCase().includes(fandomSearch)).map(fandom => (
                    <Card
                        hoverable
                        title={fandom.name}
                        key={fandom.name}
                        actions={[
                            <Button type="primary">Update {fandom.name}</Button>,
                            <Button type="primary">Delete {fandom.name}</Button>
                        ]}
                        className="fandom-card"
                    >
                        <div className="fandom-images">
                            {fandom.ffn_url && (
                                <Link href={fandom.ffn_url} target="_blank">
                                    <Image src={ffn_logo} preview={false} />
                                </Link>
                            )}
                            {fandom.ao3_url && (
                                <Link href={fandom.ao3_url} target="_blank">
                                    <Image src={ao3_logo} preview={false} />
                                </Link>
                            )}
                        </div>
                        <div className="search-criteria">
                            <Text>
                                The collection will search for stories
                                across {fandom.search.toLocaleLowerCase()} page{fandom.search === 'Many' && 's'}
                            </Text>
                        </div>
                    </Card>
                ))}
                <AddFandom openAdd={openAdd} setOpenAdd={setOpenAdd} message={message} setMessage={setMessage}/>
                <UpdateFandom openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} message={message} setMessage={setMessage} fandomName={fandomName}/>
                <DeleteFandom fandomName={fandomName} openDelete={openDelete} setOpenDelete={setOpenDelete} message={message} setMessage={setMessage}/>
            </div>
        )
    }
    else {
        return (
            <Spin fullscreen tip="Waiting for fandoms to be retrieved" />
        )
    }
}

export default Fandoms;