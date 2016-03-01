var React = require('react');
var SideBar = require('../sideBar/sideBar');
var PollMenuBar = require('./menuBar/pollMenuBar');
var PollIndex = require('./pollIndex');
var PollStore = require('../../stores/pollStore.js');
var QuestionStore = require('../../stores/questionStore.js');
var QuestionFilterStore = require('../../stores/questionFilterStore.js');
var PollActions = require('../../actions/pollActions.js');

var PollPanel = React.createClass({

  getInitialState: function () {
    return {
      polls: PollStore.all(),
      questionFilters: QuestionFilterStore.all(),
      selectedQuestionIds: QuestionStore.selectedQuestionIds()
    };
  },

  componentDidMount: function () {
    this.PollStoreToken = PollStore
      .addListener(this._onPollStoreChange);

    this.QuestionFilterStoreToken = QuestionFilterStore
      .addListener(this._onQuestionFilterStoreChange);

    PollActions.fetchAllPolls(1); //TODO how to get the user's id in front-end?
  },

  _onPollStoreChange: function () {
    this.setState({
      polls: PollStore.all(),
      selectedQuestionIds: QuestionStore.selectedQuestionIds()
    });
  },

  _onQuestionFilterStoreChange: function () {
    this.setState({
      questionFilters: QuestionFilterStore.all()
    });
  },

  componentWillUnmount: function () {
    this.PollStoreToken.remove();
    this.QuestionFilterStoreToken.remove();
  },

  render: function() {
    return (
      <div className="poll-panel group">
          <SideBar />
          <PollMenuBar polls={this.state.polls}
                       selectedQuestionIds={this.state.selectedQuestionIds}/>
          <PollIndex polls={this.state.polls}
                     questionFilters={this.state.questionFilters}
                     selectedQuestionIds={this.state.selectedQuestionIds}
                     />
      </div>
    );
  }

});

module.exports = PollPanel;
