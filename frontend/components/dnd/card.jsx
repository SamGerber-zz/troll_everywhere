var React = require('react');
var PropTypes = React.PropTypes;
var DnD = require('react-dnd');
var DropTarget = DnD.DropTarget;
var DragSource = DnD.DragSource;
var ItemTypes = require('./itemTypes');
var flow = require('lodash/flow');


var style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

var cardSource = {
  beginDrag: function(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag: function(props, monitor) {
    // debugger;
    var item = monitor.getItem();
    var droppedId = item.id;
    var originalIndex = item.originalIndex;
    var didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

var cardTarget = {
  canDrop: function() {
    return false;
  },

  hover: function(props, monitor) {
    var draggedId = monitor.getItem().id;
    var overId = props.id;

    if (draggedId !== overId) {
      var overIndex = props.findCard(overId).index;
      console.log(draggedId + "|"+ overIndex);
      props.moveCard(draggedId, overIndex);
    }
  }
};

var collectDrag = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var collectDrop = function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

var Card = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  },

  render: function() {
    var text = this.props.text;
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource
    var connectDropTarget = this.props.connectDropTarget;
    var opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity: opacity
      }}>
        {text}
      </div>
    ));
  }
});

module.exports = flow(
  DragSource(ItemTypes.CARD, cardSource, collectDrag),
  DropTarget(ItemTypes.CARD, cardTarget, collectDrop)
)(Card);
