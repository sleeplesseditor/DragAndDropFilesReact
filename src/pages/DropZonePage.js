import React from 'react';
import DropZone from '../components/DropZone';

function DropZonePage() {

  return (
    <React.Fragment>
        <div className="App">
            <h3>DropZone File Upload</h3>
            <br />
            <DropZone />
        </div>
    </React.Fragment>
  );
}

export default DropZonePage;