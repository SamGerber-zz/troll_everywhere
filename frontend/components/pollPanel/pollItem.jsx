/* React Libraries */
var React = require('react');

/* React Components */
var Question = require('./question');
var Poll = require('./poll');

/* React Flux Stores */
var QuestionStore = require('../../stores/questionStore.js');
var PollStore = require('../../stores/pollStore.js');
var QuestionFilterStore = require('../../stores/questionFilterStore.js');

/* React Flux Action Creators */
var QuestionActions = require('../../actions/questionActions.js');
var PollActions = require('../../actions/pollActions.js');



var PollItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    var poll = PollStore.find(this.props.pollId);
    if (poll.questions) {
      var questions = QuestionFilterStore.filter(poll.questions);
    }
    return ({
      poll: poll,
      questions: questions,
      expanded: true
    });
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

  _onPollClick: function(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  },

  _onQuestionClick: function(questionId, e) {
    e.preventDefault();
    this.context.router.push("/questions/"+questionId+"/");
  },


  render: function() {
    var Questions = [],
        isActive;
    if (this.state.questions) {
      var className = "list-group-item";
      if (!this.state.expanded) {
        className += " hide";
      }
      Questions = this.state.questions.map(function(question){
        isActive = question.is_active ? " list-group-item-success" : "";
        return (
          <li key={question.id}
              className={className+isActive}>
            <Question question={question}
                      clickHandler={
                        this._onQuestionClick.bind(null, question.id)
                      } />
          </li>
        );
      }, this);
    }

    return (
      <li className="list-group-item">
        <ul className="list-group">
          <li className="list-group-item">
            <Poll poll={this.state.poll}
                questionCount={Questions.length}
                expanded={this.state.expanded}
                clickHandler={this._onPollClick} />
          </li>
          {Questions}
        </ul>
      </li>
    );
  }

});

module.exports = PollItem;
