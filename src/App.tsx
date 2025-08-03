import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu, MenuProps, notification } from 'antd';

import { CompletedList, Fandoms, Home, ReadingList, StoriesForDate, StoryPage } from "./Pages";
import Calendar from './components/Calendar';
import { AddFandom } from './components/Fandoms';
import './App.css';
import './nav.css';
import AddCollectionForm from './components/AddCollectionForm';

// menu icon
// react-responsive for media queries
// https://www.npmjs.com/package/react-responsive

const App = () => {
    const [createFandom, setCreateFandom] = useState(false);
    const [addCollection, setAddCollection] = useState(false);

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
            label: <Calendar />,
            className: 'collection-browse'
        },
        {
            key: "add-collection",
            label: "Add collection",
            onClick: () => setAddCollection(true),
        },
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
                <AddCollectionForm
                    open={addCollection}
                    setOpen={setAddCollection}
                />
            </Router>
        </>
    );
}

export default App;
