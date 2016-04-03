var Container = require('./container');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var React = require('react');
var ReactTooltip = require("react-tooltip");


var SortableCancelOnDropOutside = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/04%20Sortable/Cancel%20on%20Drop%20Outside'>Browse the Source</a></b>
        </p>
        <p>
          Because you write the logic instead of using the readymade components, you can tweak the behavior to the one your app needs.
          In this example, instead of moving the card inside the drop target's <code>drop()</code> handler, we do it inside the drag source's <code>endDrag()</code> handler. This let us check <code>monitor.didDrop()</code> and revert the drag operation if the card was dropped outside its container.
        </p>
        <Container />
        <ReactTooltip type="info" delayShow={250}/>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(SortableCancelOnDropOutside);
