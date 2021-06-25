import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Modal from 'react-modal';
import services from './services/services';
import StoryList from './StoryList';
import StoryPage from './StoryPage.js';
import Calendar from './Calendar';
import StoriesForDate from './StoriesForDate';
import Fandoms from './Fandoms';
import ReadingList from './ReadingList';
import CompletedList from './CompletedList';
import './App.css';
import './nav.css';

// menu icon
// react-responsive for media queries
// https://www.npmjs.com/package/react-responsive

const App = () => {
    const [stories, setStories] = useState([])
    const [dates, setDates] = useState([])
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
      services.getMostRecentStories().then(data => {
        setStories(data)
        }).catch(err => {
            <Modal isOpen={true}>{err}</Modal>
        })
        services.getDates().then(data => {
            setDates(data)
        }).catch(err => {
            setOpenModal(true);
            <Modal isOpen={openModal}>{err}<button onClick={() => setOpenModal(false)}>Close</button></Modal>
        })
      }, [openModal]
    )

    const padding = {
        padding: 5
    }

    return (
        <Router>
            <nav>
                <div id="menu-items">
                    <ul>
                        <li><Link style={padding} to='/'>Home</Link></li>
                        <li><Link style={padding} to='/reading-list'>Reading List</Link></li>
                        <li><Link style={padding} to='/completed-list'>Completed List</Link></li>
                        <li><Link style={padding} to='/fandoms'>Fandoms</Link></li>
                        <Calendar dates={dates}/>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route path='/story/:storyID'><StoryPage/></Route>
                <Route path='/stories/:date'><StoriesForDate/></Route>
                <Route path='/fandoms'><Fandoms/></Route>
                <Route path='/reading-list'><ReadingList/></Route>
                <Route path='/completed-list'><CompletedList/></Route>
                <Route path='/'><StoryList stories={stories}/></Route>
            </Switch>
        </Router>
    );
}

export default App;
