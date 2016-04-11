/* React Libraries */
var React = require('react');
var ReactTooltip = require('react-tooltip');

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
    ReactTooltip.hide();
    this.setState({ expanded: !this.state.expanded });
  },

  _onQuestionClick: function(questionId, e) {
    e.preventDefault();
    ReactTooltip.hide();
    this.context.router.push("/questions/"+questionId+"/");
  },


  render: function() {
    var Questions = [],
        isActive, isLocked;
    if (this.state.questions) {
      var className = "btn list-group-item";
      if (!this.state.expanded) {
        className += " hide";
      }
      Questions = this.state.questions.map(function(question, i){
        isActive = question.is_active ? " list-group-item-success" : "";
        isLocked = question.is_locked && !question.is_active ? " disabled" : "";
        return (
          <li key={question.id}
              className={className+isActive+isLocked}>
            <Question question={question}
                      questionOrd={i + 1}
                      pollId={this.state.poll.id}
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
