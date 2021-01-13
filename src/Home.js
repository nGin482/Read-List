import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import services from './services/services';

import './App.css';

const App = () => {
    const [stories, setStories] = useState([])

    useEffect(() => {
      services.getDateStories('3-12-2020').then(data => {
        setStories(data)
        }).catch(err => {
          console.log(err)
        })
      }, []
    )
    console.log(stories[0])

    const padding = {
        padding: 5
    }

    return (
        <Router>
            <nav>
                <div id="menuItems">
                    <Link style={padding} to='/interested'>Interested</Link>
                    <Link style={padding} to='/date'>Choose Date</Link>
                    <Link style={padding} to='/fandoms'>Fandoms</Link>
                    <Link style={padding} to='/'>Home</Link>
                </div>
            </nav>
            <Switch>
                <Route path='/'></Route>
            </Switch>
        </Router>
    );
}

export default App;
