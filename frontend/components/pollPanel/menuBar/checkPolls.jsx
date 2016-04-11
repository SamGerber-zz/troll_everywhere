/* React Libraries */
var React = require('react');
var ReactTooltip = require('react-tooltip');

/* React Flux Action Creators */
var QuestionFilterActions = require('../../../actions/questionFilterActions.js');





var NavBar = React.createClass({

  _checkAllPolls: function() {
    var questions = [];
    this.props.polls.forEach(function(poll){
      questions = questions.concat(poll.questions);
    });
    QuestionFilterActions.checkAll(questions);
  },

  _unCheckAllPolls: function() {
    QuestionFilterActions.checkNothing();
  },

  _checkAllLocked: function() {
    this._unCheckAllPolls();
    var questions = [];
    this.props.polls.forEach(function(poll){
      questions = questions.concat(poll.questions.filter(function(question){
        return question.is_locked;
      }));
    });
    QuestionFilterActions.checkAll(questions);
  },

  _checkAllUnlocked: function() {
    this._unCheckAllPolls();
    var questions = [];
    this.props.polls.forEach(function(poll){
      questions = questions.concat(poll.questions.filter(function(question){
        return !question.is_locked;
      }));
    });
    QuestionFilterActions.checkAll(questions);
  },

  render: function() {
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                data-tip="Dynamically select questions"
                aria-expanded="false">
          <span className="glyphicon glyphicon-check"/>
          Select
          <span className="caret"/>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#"
                 onClick={this._checkAllPolls}
                 data-tip="Select all questions">All</a></li>
          <li><a href="#"
                 onClick={this._unCheckAllPolls}
                 data-tip="Deselect all questions">None</a></li>
          <li><a href="#"
                 onClick={this._checkAllLocked}
                 data-tip="Select all locked questions">Locked</a></li>
          <li><a href="#"
                 onClick={this._checkAllUnlocked}
                 data-tip="Select all unlocked questions">Unlocked</a></li>
        </ul>
      </div>
    );
  }

});

module.exports = NavBar;
