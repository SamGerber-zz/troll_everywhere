var React = require('react');
var QuestionStore = require('../../stores/questionStore.js');
var PollStore = require('../../stores/pollStore.js');
var QuestionFilterStore = require('../../stores/questionFilterStore.js');
var QuestionActions = require('../../actions/questionActions.js');
var PollActions = require('../../actions/pollActions.js');
var Question = require('./question');
var Poll = require('./poll');

var PollItem = React.createClass({

  getStateFromStore: function () {
    var poll = PollStore.find(this.props.pollId);
    if (poll.questions) {
      var questions = QuestionFilterStore.filter(poll.questions);
    }
    return ({
      poll: poll,
      questions: questions
    });
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.PollStoreToken = PollStore
      .addListener(this._onPollStoreChange);

    this.QuestionFilterStoreToken = QuestionFilterStore
      .addListener(this._onQuestionFilterStoreChange);

    PollActions.fetchSinglePoll(this.props.pollId);
  },

  componentWillUnmount: function () {
    this.PollStoreToken.remove();
    this.QuestionFilterStoreToken.remove();
  },

  _onPollStoreChange: function () {
    this.setState(this.getStateFromStore());
  },

  _onQuestionFilterStoreChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function() {
    var Questions = [];
    if (this.state.questions) {
      Questions = this.state.questions.map(function(question){
        return (
          <li key={question.id} className="poll-panel-poll" >
            <Question question={question} />
          </li>
        );
      });
    }

    return (
      <ul className="poll-panel-poll-index group">
        <Poll poll={this.state.poll} questionCount={Questions.length} />
        {Questions}
      </ul>
    );
  }

});

module.exports = PollItem;
