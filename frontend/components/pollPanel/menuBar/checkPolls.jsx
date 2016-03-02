/* React Libraries */
var React = require('react');

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
                aria-expanded="false">
          <span className="glyphicon glyphicon-check" />
          Select
          <span className="caret"/>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#" onClick={this._checkAllPolls}>All</a></li>
          <li><a href="#" onClick={this._unCheckAllPolls}>None</a></li>
          <li><a href="#" onClick={this._checkAllLocked}>Locked</a></li>
          <li><a href="#" onClick={this._checkAllUnlocked}>Unlocked</a></li>
        </ul>
      </div>
    );
  }

});

module.exports = NavBar;
