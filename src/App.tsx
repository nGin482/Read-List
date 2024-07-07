import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu, MenuProps, notification } from 'antd';

import { CompletedList, Fandoms, Home, ReadingList, StoriesForDate, StoryPage } from "./Pages";
import Calendar from './components/Calendar';
import { AddFandom } from './components/Fandoms';
import services from "./services/services";
import './App.css';
import './nav.css';

// menu icon
// react-responsive for media queries
// https://www.npmjs.com/package/react-responsive

const App = () => {
    const [dates, setDates] = useState<string[][]>([]);
    const [createFandom, setCreateFandom] = useState(false);

    useEffect(() => {
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
            label: 'Fandoms',
            children: [
                {
                    type: "item",
                    label: <Link style={padding} to='/fandoms'>View all Fandoms</Link>,
                    key: "view-all-fandoms"
                },
                {
                    type: "item",
                    label: 'Add Fandom',
                    key: "add-fandom",
                    onClick: () => setCreateFandom(true)
                }
            ]
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
                    <Route path='/story/:id'><StoryPage /></Route>
                    <Route path='/stories/:date'><StoriesForDate /></Route>
                    <Route path='/fandoms'><Fandoms /></Route>
                    <Route path='/reading-list'><ReadingList /></Route>
                    <Route path='/completed-list'><CompletedList /></Route>
                    <Route path='/'><Home /></Route>
                </Switch>
                <AddFandom createFandom={createFandom} setCreateFandom={setCreateFandom}  />
            </Router>
        </>
    );
}

export default App;
