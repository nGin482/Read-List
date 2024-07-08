import { useState, useEffect } from 'react';
import { Button, Card, Image, Input, Popconfirm, Spin, Typography, notification } from 'antd';

import services from '../services/services';
import { UpdateFandom } from '../components/Fandoms';
import { FandomArchive } from '../../types/index.js';
import "./styles/Fandoms.css";

import ffn_logo from '../images/FF.Net_Logo.png';
import ao3_logo from '../images/Archive_of_Our_Own_logo.png';

const Fandoms = () => {
    const [fandoms, setFandoms] = useState<FandomArchive[]>([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [fandomUpdating, setFandomUpdating] = useState<FandomArchive>(null);
    const [fandomSearch, setFandomSearch] = useState('');

    const { Link, Text } = Typography;
    const { Search } = Input;

    useEffect(() => {
        services.getFandoms().then((data: FandomArchive[]) => {
            setFandoms(data)
        })
    }, []);

    const openUpdateModal = (fandom: FandomArchive) => {
        setOpenUpdate(true);
        setFandomUpdating(fandom);
    };

    const deleteFandom = async (fandom: string) => {
        console.log(`Deleting ${fandom}`)
        try {
            await services.deleteFandom(fandom);
            notification.success({
                message: `${fandom} has been deleted`
            });
        }
        catch(error) {
            notification.error({
                message: `There was a problem deleting ${fandom}`,
                description: error?.response?.data.message || error.message
            });
        }
    };

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
                <div id="fandoms-list">
                    {fandoms.filter(fandom => fandom.name.toLocaleLowerCase().includes(fandomSearch)).map(fandom => (
                        <Card
                            hoverable
                            title={fandom.name}
                            key={fandom.name}
                            actions={[
                                <Button onClick={() => openUpdateModal(fandom)} type="primary">Update {fandom.name}</Button>,
                                <Popconfirm
                                    title={`Delete ${fandom.name}?`}
                                    description={(
                                        <>
                                            <p>Are you sure you would like to delete this fandom?</p>
                                            <p>The Archive will no longer search for stories from <strong>{fandom.name}</strong></p>
                                        </>
                                    )}
                                    okText="Yes"
                                    onConfirm={() => deleteFandom(fandom.name)}
                                    cancelText="No"
                                >
                                    <Button danger type="primary">Delete {fandom.name}</Button>
                                </Popconfirm>
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
                </div>
                {fandomUpdating && (
                    <UpdateFandom
                        openModal={openUpdate}
                        setOpenModal={setOpenUpdate}
                        fandom={fandomUpdating}
                    />
                )}
            </div>
        ) : (
            <Spin fullscreen tip="Waiting for fandoms to be retrieved" />
        )
    );
};

export default Fandoms;
