import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import DropZonePage from './pages/DropZonePage';
import SortableHocPage from './pages/SortableHocPage';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={DropZonePage} />
          <Route exact path="/sortablehoc" component={SortableHocPage} />
        </Switch>
    </Router>
  );
}

export default App;
