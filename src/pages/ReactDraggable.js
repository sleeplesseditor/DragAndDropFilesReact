import React from 'react';
import ReactDraggable from '../components/ReactDraggable/ReactDraggable';

function SortableHocPage() {

  return (
    <React.Fragment>
        <div className="App">
            <h2>ReactDraggable</h2>
            <ReactDraggable />
        </div>
    </React.Fragment>
  );
}

export default SortableHocPage;