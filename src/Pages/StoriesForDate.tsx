import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import BrowseList from '../BrowseList.js';
import services from '../services/services.js';
import { Collection } from '../utils/types.js';

const StoriesForDate = () => {
    const { date } = useParams<{ date: string }>();
    const [collection, setCollection] = useState<Collection>(null);

    useEffect(() => {
        services.getStoriesByDate(date).then(data => setCollection(data));
    }, [date]);

    return (
        <BrowseList collection={collection} />
    );
};

export default StoriesForDate;