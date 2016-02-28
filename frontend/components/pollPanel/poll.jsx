var React = require('react');
var QuestionFilterStore = require('../../stores/questionFilterStore');
var QuestionFilterActions = require('../../actions/questionFilterActions');

var Poll = React.createClass({

  getStateFromStore: function () {
    var questions = this.props.poll.questions;
    return ({
      checked: QuestionFilterStore.areCheckedQuestions(questions)
    });
  },

  getInitialState: function(){
    return ({
      checked: false
    });
  },

  componentDidMount: function () {
    this.QuestionFilterStoreToken = QuestionFilterStore
      .addListener(this._onQuestionFilterStoreChange);
  },

  componentWillUnmount: function () {
    this.QuestionFilterStoreToken.remove();
  },

  _onQuestionFilterStoreChange: function() {
    this.setState(this.getStateFromStore());
  },

  _onCheckBoxChange: function(e) {
    e.stopPropagation();
    if (this.state.checked) {
      QuestionFilterActions.toggleChecks(this.props.poll.questions);
    } else {
      QuestionFilterActions.checkAll(this.props.poll.questions);
    }
  },

  render: function() {
    var expandIcon = this.props.expanded ? "▼" : "▶";
    return (
      <div className="poll-panel-poll-group group"
           onClick={this.props.clickHandler}>
        <ul>
          <li className="poll-panel-poll-group-expand">{expandIcon}</li>
          <li className="poll-panel-poll-group-checkbox">
            <input type="checkbox"
                   className="poll-panel-poll-group-checkbox"
                   checked={this.state.checked}
                   onClick={this._onCheckBoxChange}/>
          </li>
          <li className="poll-panel-poll-group-name">{this.props.poll.title}</li>
        </ul>
        <span className="poll-panel-poll-group-count">
          {this.props.questionCount} questions
        </span>
      </div>
    );
  }

});

module.exports = Poll;
