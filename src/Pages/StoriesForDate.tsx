import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { notification } from 'antd';

import BrowseList from '../components/Lists/BrowseList.js';
import { CollectionsAPI } from '../services/CollectionsAPI.js';
import { Collection } from '../utils/types.js';

const StoriesForDate = () => {
    const { date } = useParams<{ date: string }>();
    const [collection, setCollection] = useState<Collection>(null);

    useEffect(() => {
        CollectionsAPI.getCollectionForDate(date)
            .then(setCollection)
            .catch(error => {
                notification.error({
                    message: `There was a problem retrieving the collection for ${date}`,
                    description: error?.response?.data?.message || error.message
                })
            });
    }, [date]);

    return (
        <BrowseList collection={collection} />
    );
};

export default StoriesForDate;