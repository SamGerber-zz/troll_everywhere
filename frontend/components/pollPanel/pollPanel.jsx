var React = require('react');
var SideBar = require('../sideBar/sideBar');
var PollMenuBar = require('./menuBar/pollMenuBar');
var PollIndex = require('./pollIndex');
var PollStore = require('../../stores/pollStore.js');
var QuestionStore = require('../../stores/questionStore.js');
var SessionStore = require('../../stores/sessionStore.js');
var QuestionFilterStore = require('../../stores/questionFilterStore.js');
var PollActions = require('../../actions/pollActions.js');
var QuestionActions = require('../../actions/questionActions.js');

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
      
    PollActions.fetchAllPolls(SessionStore.currentUser().id);
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
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <PollMenuBar polls={this.state.polls}/>

            <h1 className="page-header">Your Polls</h1>
            <PollIndex polls={this.state.polls} />

          </div>
        </div>
      </div>
    );
  }

});

module.exports = PollPanel;
