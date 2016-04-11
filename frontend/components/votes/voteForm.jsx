var React = require('react');
var VoteActions = require('../../actions/voteActions');
var QuestionActions = require('../../actions/questionActions');
var PresentationActions = require('../../actions/presentationActions');
var QuestionStore = require('../../stores/questionStore');
var SessionStore = require('../../stores/sessionStore');
var VoteStore = require('../../stores/voteStore');
var LoggedInNavBar = require('../navBar/loggedInNavBar');
var LoggedOutNavBar = require('../navBar/loggedOutNavBar');
var VoteNavBar = require('../navBar/voteNavBar');
var Response = require('./response');
var QuestionDisplay = require('./questionDisplay');
var QuestionComingSoon = require('./questionComingSoon');

var VoteForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _getStateFromStore: function() {
    return { question: QuestionStore.presentedQuestion() };
  },

  getInitialState: function () {
    return this._getStateFromStore();
  },

  componentWillMount: function() {
    this.questionToken = QuestionStore.addListener(this._onQuestionStoreChange);
    this.voteToken = VoteStore.addListener(this._onVoteStoreChange);
    PresentationActions.fetchPresentation(this.props.params.id);
    this.intervalId = setInterval(PresentationActions.fetchPresentation.bind(null, this.props.params.id), 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalId);
    this.questionToken.remove();
    this.voteToken.remove();
  },

  _onQuestionStoreChange: function() {
    this.setState(this._getStateFromStore());
  },

  _onVoteStoreChange: function() {
    PresentationActions.fetchPresentation(this.props.params.id);
  },

  createVote: function (direction, e) {
    e.preventDefault();
    
    var vote = {is_up_vote: (direction === "up")};
    var responseId = this.props.params.id;
    VoteActions.createVote(responseId, vote, function(message){
      var ResponsePath = "/responses/" + responseId;
      this.context.router.push(ResponsePath);
    }.bind(this));
    this.setState(this.blankAttributes);
  },

  render: function() {
    var responses, nav, questionDisplay;
    if(this.state.question.responses) {
      questionDisplay = <QuestionDisplay question={this.state.question}/> ;
    } else {
      questionDisplay = <QuestionComingSoon hostName={this.props.params.id}/>;
    }

    nav = SessionStore.isUserLoggedIn() ? <LoggedInNavBar/> : <LoggedOutNavBar/>;

    return (
      <div>
        {nav}
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
            {questionDisplay}
          </div>
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
        </div>
      </div>


    );
  }

});

module.exports = VoteForm;
