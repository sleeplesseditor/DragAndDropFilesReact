import React from 'react';
import DropZoneUploader from '../components/DropZoneUploader/DropZoneUploader';

function DropZonePage() {

  return (
    <React.Fragment>
        <div className="App">
            <h2>DropZoneUploader</h2>
            <DropZoneUploader />
        </div>
    </React.Fragment>
  );
}

export default DropZonePage;