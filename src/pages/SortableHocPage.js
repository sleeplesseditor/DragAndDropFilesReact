import React from 'react';
import SortableHoc from '../components/SortableHoc';

function SortableHocPage() {

  return (
    <React.Fragment>
        <div className="App">
            <h2>Sortable Higher Order Components</h2>
            <SortableHoc />
        </div>
    </React.Fragment>
  );
}

export default SortableHocPage;