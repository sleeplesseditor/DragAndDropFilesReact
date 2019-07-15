import React from 'react';
import './App.css';
import DropZone from './components/DropZone';

function App() {
  return (
    <div className="App">
       <div className="navbar">
            <p className="nav_header">React Drag and Drop Files</p>
      </div>
      <DropZone />
    </div>
  );
}

export default App;
