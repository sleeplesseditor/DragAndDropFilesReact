import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import DropZonePage from './pages/DropZonePage';
import DropZoneUploaderPage from './pages/DropZoneUploaderPage';
import SortableHocPage from './pages/SortableHocPage';
import ReactDraggable from './pages/ReactDraggable';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={DropZonePage} />
          <Route exact path="/dropzone-uploader" component={DropZoneUploaderPage} />
          <Route exact path="/sortablehoc" component={SortableHocPage} />
          <Route exact path="/react-draggable" component={ReactDraggable} />
        </Switch>
    </Router>
  );
}

export default App;
