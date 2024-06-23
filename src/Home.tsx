import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu, MenuProps, notification } from 'antd';

import services from "./services/services";
import StoryList from './StoryList';
import StoryPage from './StoryPage';
import Calendar from './Calendar';
import StoriesForDate from './StoriesForDate';
import Fandoms from './Fandoms';
import ReadingList from './ReadingList';
import CompletedList from './CompletedList';
import { Collection } from './utils/types';
import './App.css';
import './nav.css';

// menu icon
// react-responsive for media queries
// https://www.npmjs.com/package/react-responsive

const App = () => {
    const [collection, setCollection] = useState<Collection>(null)
    const [dates, setDates] = useState<string[][]>([]);

    useEffect(() => {
        services.getMostRecentStories().then(
            collection => setCollection(collection)
        ).catch(err => {
            notification.error({
                message: 'There was a problem retrieving the most recent collection'
            });
        });
        services.getDates().then(
            data => setDates(data)
        ).catch(err => {
            notification.error({
                message: 'There was a problem retrieving a list of available dates of collections'
            });
        });
    }, []);

    const padding = {
        padding: 5
    };

    const navItems: MenuProps['items'] = [
        {
            key: 'home',
            label: <Link style={padding} to='/'>Home</Link>
        },
        {
            key: 'reading-list',
            label: <Link style={padding} to='/reading-list'>Reading List</Link>
        },
        {
            key: 'completed-list',
            label: <Link style={padding} to='/completed-list'>Completed List</Link>
        },
        {
            key: 'fandoms',
            label: <Link style={padding} to='/fandoms'>Fandoms</Link>
        },
        {
            key: 'collection-browse',
            label: <Calendar dates={dates}/>,
            className: 'collection-browse'
        }
    ];

    return (
        <>
            <Router>
                <Menu items={navItems} mode="horizontal" theme="dark" />
                <Switch>
                    <Route path='/story/:storyID'><StoryPage/></Route>
                    <Route path='/stories/:date'><StoriesForDate/></Route>
                    <Route path='/fandoms'><Fandoms/></Route>
                    <Route path='/reading-list'><ReadingList/></Route>
                    <Route path='/completed-list'><CompletedList/></Route>
                    <Route path='/'><StoryList collection={collection}/></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
