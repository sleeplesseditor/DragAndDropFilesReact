import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li className="sortable-item">{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="sortable-hoc-container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </ul>
  );
});

class SortableHoc extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableHoc;