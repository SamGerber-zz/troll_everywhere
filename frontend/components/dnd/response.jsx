var React = require('react');
var PropTypes = React.PropTypes;
var DnD = require('react-dnd');
var DropTarget = DnD.DropTarget;
var DragSource = DnD.DragSource;
var ItemTypes = require('./itemTypes');
var EditableItem = require('./editableItem');
var flow = require('lodash/flow');
var ReactTooltip = require("react-tooltip");


var style = {
  border: '1px dashed gray',
  height: '50px',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

var responseSource = {
  beginDrag: function(props) {
    ReactTooltip.hide();
    return {
      ord: props.ord,
      originalIndex: props.findResponse(props.ord).index
    };
  },

  endDrag: function(props, monitor) {
    var item = monitor.getItem();
    var droppedOrd = item.ord;
    var originalIndex = item.originalIndex;
    var didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveResponse(droppedOrd, originalIndex);
    }
  }
};

var responseTarget = {
  canDrop: function() {
    return false;
  },

  hover: function(props, monitor) {
    var draggedOrd = monitor.getItem().ord;
    var overOrd = props.ord;

    if (draggedOrd !== overOrd) {
      var overIndex = props.findResponse(overOrd).index;
      props.moveResponse(draggedOrd, overIndex);
    }
  }
};

var collectDrag = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

var collectDrop = function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

var Response = React.createClass({
  propTypes: {
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    // id: PropTypes.any.isRequired,
    ord: PropTypes.any.isRequired,
    body: PropTypes.string.isRequired,
    // votes: PropTypes.number.isRequired,
    moveResponse: PropTypes.func.isRequired,
    deleteResponse: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired,
    findResponse: PropTypes.func.isRequired
  },

  render: function() {
    var id = this.props.id;
    var ord = this.props.ord;
    var body = this.props.body;
    var votes = this.props.votes;
    var updateText = this.props.updateText;
    var deleteResponse = this.props.deleteResponse;
    var isDragging = this.props.isDragging;
    var connectDragPreview = this.props.connectDragPreview
    var connectDragSource = this.props.connectDragSource
    var connectDropTarget = this.props.connectDropTarget;
    var opacity = isDragging ? 0 : 1;

    return connectDragPreview(connectDropTarget(
      <div className="row" style={{
              border: '1px dashed gray',
              padding: '0.5rem 1rem',
              marginBottom: '.5rem',
              backgroundColor: 'white',
              opacity: opacity
      }}>
        <div className="col-xs-1">
          {
            connectDragSource(
              <span className="btn glyphicon glyphicon-sort grabbable"
                    aria-hidden="true"
                    data-tip="Drag to reorder"></span>
            )
          }
        </div>
        <div className="col-xs-8">
           <EditableItem updateText={updateText.bind(null, ord)}
                         text={body} />
        </div>
        <div className="col-xs-2">
           Votes:{votes}
        </div>
        <div className="col-xs-1">
          <span className="btn glyphicon glyphicon-trash"
                aria-hidden="true" data-tip="Delete Response"
                onClick={deleteResponse.bind(null, ord)}></span>
        </div>
      </div>
    ));
  }
});

module.exports = flow(
  DragSource(ItemTypes.RESPONSE, responseSource, collectDrag),
  DropTarget(ItemTypes.RESPONSE, responseTarget, collectDrop)
)(Response);
