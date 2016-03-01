var React = require('react');
var QuestionFilterStore = require('../../../stores/questionFilterStore.js');
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

  render: function() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ✓Select <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#" onClick={this._checkAllPolls}>All</a></li>
          <li><a href="#" onClick={this._unCheckAllPolls}>None</a></li>
          <li><a href="#">Locked</a></li>
          <li><a href="#">Unlocked</a></li>
        </ul>
      </div>
    );
  }

});

module.exports = NavBar;
