import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import services from './services/services';
import Story from './Story';
import './App.css';

const App = () => {
    const [stories, setStories] = useState([])

    useEffect(() => {
      services.getDateStories('4-1-2021').then(data => {
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
                <div id="menuItems">
                    <Link style={padding} to='/'>Home</Link>
                    <Link style={padding} to='/interested'>Interested</Link>
                    <Link style={padding} to='/date'>Choose Date</Link>
                    <Link style={padding} to='/fandoms'>Fandoms</Link>
                </div>
            </nav>
            <Switch>
                <Route path='/'>{stories.map(story => <Story story={story}/>)}</Route>
            </Switch>
        </Router>
    );
}

export default App;
