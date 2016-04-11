var Container = require('./container');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var React = require('react');
var ReactTooltip = require("react-tooltip");


var SortableCancelOnDropOutside = React.createClass({

  render: function() {
      var question = this.props.question;
      var hideModal = this.props.hideModal;
      return (
      <div className="question-modal">
        <header>
          <h1>Edit Question!</h1>
        </header>
        <Container question={question} hideModal={hideModal}/>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(SortableCancelOnDropOutside);
