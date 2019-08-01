import React from 'react';
import DropZone from '../components/DropZone/DropZone';

function DropZonePage() {

  return (
    <React.Fragment>
        <div className="App">
            <h2>DropZone File Upload</h2>
            <DropZone />
        </div>
    </React.Fragment>
  );
}

export default DropZonePage;