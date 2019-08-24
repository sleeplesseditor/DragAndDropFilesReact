import React, {Component} from 'react';
import Draggable from 'react-draggable';
import './Draggable.css';
class ReactDraggable extends Component {
    constructor() {
        super();
        this.state = {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };
    }
    
    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart() {
        let { activeDrags } = this.state;
        this.setState({activeDrags: ++activeDrags});
    };
    
    onStop() {
        let { activeDrags } = this.state;
        this.setState({activeDrags: --activeDrags});
    };
    
    // For controlled component
    adjustXPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    };
    
    adjustYPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    };

    onControlledDrag(e, position) {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };

    onControlledDragStop(e, position) {
        this.onControlledDrag(e, position);
        this.onStop();
    };
  
  render() {
    const dragHandlers = {onStart: this.handleStart, onStop: this.handleStop};
    const {deltaPosition} = this.state;
    return (
        <div>
        <Draggable {...dragHandlers}>
          <div className="box">I can be dragged anywhere</div>
        </Draggable>
        <Draggable axis="x" {...dragHandlers}>
          <div className="box cursor-x">I can only be dragged horizonally (x axis)</div>
        </Draggable>
        <Draggable axis="y" {...dragHandlers}>
          <div className="box cursor-y">I can only be dragged vertically (y axis)</div>
        </Draggable>
        <Draggable onStart={() => false}>
          <div className="box">I don't want to be dragged</div>
        </Draggable>
        <Draggable handle="strong" {...dragHandlers}>
          <div className="box no-cursor">
            <strong className="cursor"><div>Drag here</div></strong>
            <div>You must click my handle to drag me</div>
          </div>
        </Draggable>
        <Draggable cancel="strong" {...dragHandlers}>
          <div className="box">
            <strong className="no-cursor">Can't drag here</strong>
            <div>Dragging here works</div>
          </div>
        </Draggable>
        <Draggable grid={[25, 25]} {...dragHandlers}>
          <div className="box">I snap to a 25 x 25 grid</div>
        </Draggable>
        <Draggable grid={[50, 50]} {...dragHandlers}>
          <div className="box">I snap to a 50 x 50 grid</div>
        </Draggable>
        <Draggable bounds={{top: -100, left: -100, right: 100, bottom: 100}} {...dragHandlers}>
          <div className="box">I can only be moved 100px in any direction.</div>
        </Draggable>
        <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
          <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
            <Draggable bounds="parent" {...dragHandlers}>
              <div className="box">
                I can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
            <Draggable bounds="parent" {...dragHandlers}>
              <div className="box">
                I also can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
          </div>
        </div>
        <Draggable bounds="body" {...dragHandlers}>
          <div className="box">
            I can only be moved within the confines of the body element.
          </div>
        </Draggable>
        <Draggable>
          <div className="box" style={{position: 'absolute', bottom: '100px', right: '100px'}} {...dragHandlers}>
            I already have an absolute position.
          </div>
        </Draggable>
        <Draggable defaultPosition={{x: 25, y: 25}} {...dragHandlers}>
          <div className="box">
            {"I have a default position of {x: 25, y: 25}, so I'm slightly offset."}
          </div>
        </Draggable>
        <Draggable positionOffset={{x: '-10%', y: '-10%'}} {...dragHandlers}>
          <div className="box">
            {'I have a default position based on percents {x: \'-10%\', y: \'-10%\'}, so I\'m slightly offset.'}
          </div>
        </Draggable>
      </div>
    )
  }
}

export default ReactDraggable;