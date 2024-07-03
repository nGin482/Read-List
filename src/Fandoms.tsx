import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Card, Image, Input, Spin, Typography } from 'antd';

import services from './services/services';
import AddFandom from './components/Fandoms/AddFandom';
import UpdateFandom from './UpdateFandom.js';
import DeleteFandom from './DeleteFandom.js';
import { FandomArchive } from '../types/index.js';
import './Fandoms.css';

import ffn_logo from './images/FF.Net_Logo.png';
import ao3_logo from './images/Archive_of_Our_Own_logo.png';

interface FandomsProps {
    createFandom: boolean
    setCreateFandom: Dispatch<SetStateAction<boolean>>
}

const Fandoms = ({ createFandom, setCreateFandom }: FandomsProps) => {
    const [fandoms, setFandoms] = useState<FandomArchive[]>([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [fandomName, setFandomName] = useState('');
    const [fandomSearch, setFandomSearch] = useState('');
    const [message, setMessage] = useState('')

    const { Link, Text } = Typography;
    const { Search } = Input;

    useEffect(() => {
        services.getFandoms().then((data: FandomArchive[]) => {
            setFandoms(data)
        })
    }, []);

    const openUpdateModal = () => {
        setOpenUpdate(true)
        setMessage('')
    }
    const openDeleteModal = () => {
        setOpenDelete(true)
        setMessage('')
    }

    return (
        fandoms.length > 0 ? (
            <div id="fandoms-page">
                <h2 id="fandoms-page-header">Fandoms</h2>
                <div id="search-box">
                    <Search
                        placeholder="Search for a fandom"
                        onChange={event => setFandomSearch(event.currentTarget.value)}
                        onSearch={(value) => setFandomSearch(value)}
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
                <AddFandom createFandom={createFandom} setCreateFandom={setCreateFandom}  />
                <UpdateFandom openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} message={message} setMessage={setMessage} fandomName={fandomName}/>
                <DeleteFandom fandomName={fandomName} openDelete={openDelete} setOpenDelete={setOpenDelete} message={message} setMessage={setMessage}/>
            </div>
        ) : (
            <Spin fullscreen tip="Waiting for fandoms to be retrieved" />
        )
    );
};

export default Fandoms;
