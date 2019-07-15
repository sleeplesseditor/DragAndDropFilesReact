import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DropZonePage from './pages/DropZonePage';

function App() {
  return (
    <Router>
      <div className="navbar">
          <Link 
            to={"/"}
            style={{ textDecoration: 'none' }}
          >
            <p className="nav_header">React Drag and Drop</p>
          </Link>
          <ul className="navbar-links">
              <li>
                  <Link to={"/"}>
                      <p className="nav_header">DropZone</p>
                  </Link>
              </li>
          </ul>
      </div>
        <Switch>
          <Route exact path="/" component={DropZonePage} />
        </Switch>
    </Router>
  );
}

export default App;
