var Container = require('./container');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var React = require('react');
var ReactTooltip = require("react-tooltip");


var SortableCancelOnDropOutside = React.createClass({

  render: function() {
    var pollId = this.props.pollId || parseInt(this.props.params['id']);
    var hideModal = this.props.hideModal;
    return (
      <div className='question-modal' id="tour-10">
        <header>
          <h1>New Question!</h1>
        </header>
        <Container pollId={pollId} hideModal={hideModal}/>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(SortableCancelOnDropOutside);
