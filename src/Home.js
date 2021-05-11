import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import services from './services/services';
import StoryList from './StoryList';
import StoryPage from './StoryPage.js';
import Calendar from './Calendar';
// import Modal from 'react-modal';
// https://www.npmjs.com/package/react-modal
// http://reactcommunity.org/react-modal/
// https://www.npmjs.com/package/react-calendar
import './App.css';
import './nav.css';

const App = () => {
    const [stories, setStories] = useState([])
    const [dates, setDates] = useState([])

    useEffect(() => {
      services.getMostRecentStories().then(data => {
        setStories(data)
        }).catch(err => {
          console.log(err) // use modal to show error
        })
        services.getDates().then(data => {
            setDates(data)
        }).catch(err => {
            console.log(err)
        })
      }, []
    )

    const padding = {
        padding: 5
    }
    const [showCalendar, setshowCalendar] = useState(false)

    if (showCalendar) {
        return (
            <Router>
                <nav>
                    <div id="menu-items">
                        <ul>
                            <li><Link style={padding} to='/'>Home</Link></li>
                            <li>Choose Date</li>
                            <li><Link style={padding} to='/interested'>Interested</Link></li>
                            <li><Link style={padding} to='/fandoms'>Fandoms</Link></li>
                        </ul>
                    </div>
                <Calendar dates={dates}/>
                <button onClick={() => setshowCalendar(false)}>Close</button>
                </nav>
                <Switch>
                    <Route path='/story/:storyID'><StoryPage/></Route>
                    <Route path='/'><StoryList stories={stories}/></Route>
                </Switch>
            </Router>
        );
    }
    else {
        return (
            <Router>
                <nav>
                    <div id="menu-items">
                        <ul>
                            <li><Link style={padding} to='/'>Home</Link></li>
                            <li onClick={() => setshowCalendar(true)}>Choose Date</li>
                            <li><Link style={padding} to='/interested'>Interested</Link></li>
                            <li><Link style={padding} to='/fandoms'>Fandoms</Link></li>
                        </ul>
                        
                    </div>
                </nav>
                <Switch>
                    <Route path='/story/:storyID'><StoryPage/></Route>
                    <Route path='/'><StoryList stories={stories}/></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
