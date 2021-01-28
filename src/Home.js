import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import services from './services/services';
import StoryList from './StoryList';
import './App.css';
import './nav.css';

const App = () => {
    const [stories, setStories] = useState([])

    useEffect(() => {
      services.getMostRecentStories().then(data => {
        setStories(data)
        }).catch(err => {
          console.log(err)
        })
      }, []
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
                        <li><Link style={padding} to='/date'>Choose Date</Link></li>
                        <li><Link style={padding} to='/interested'>Interested</Link></li>
                        <li><Link style={padding} to='/fandoms'>Fandoms</Link></li>
                    </ul>
                    
                </div>
            </nav>
            <Switch>
                <Route path='/'><StoryList stories={stories}/></Route>
            </Switch>
        </Router>
    );
}

export default App;
