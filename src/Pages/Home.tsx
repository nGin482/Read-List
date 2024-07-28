import { useState, useEffect } from "react";
import { notification } from "antd";

import { BrowseList } from "../components/Lists";
import { CollectionsAPI } from "../services/CollectionsAPI";
import { Collection } from "../utils/types";

const Home = () => {
    const [collection, setCollection] = useState<Collection>(null);

    useEffect(() => {
        fetchLatestCollection();
    }, []);

    const fetchLatestCollection = async () => {
        try {
            const collection = await CollectionsAPI.getLatestCollection();
            setCollection(collection);
        }
        catch(error) {
            notification.error({
                message: 'There was a problem retrieving the most recent collection',
                description: error?.response?.data?.message || error.message
            });
        }
    };


    return (
        <BrowseList collection={collection}/>
    );
};

export default Home;