import { useState, useEffect } from "react";
import { notification } from "antd";

import { BrowseList } from "../components/Lists";
import services from "../services/services";
import { Collection } from "../utils/types";

const Home = () => {
    const [collection, setCollection] = useState<Collection>(null);

    useEffect(() => {
        services.getMostRecentStories().then(
            collection => setCollection(collection)
        ).catch(err => {
            notification.error({
                message: 'There was a problem retrieving the most recent collection'
            });
        });
    }, []);


    return (
        <BrowseList collection={collection}/>
    );
};

export default Home;