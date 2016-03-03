var React = require('react');
var VoteActions = require('../../actions/voteActions');
var QuestionActions = require('../../actions/questionActions');
var PresentationActions = require('../../actions/presentationActions');
var QuestionStore = require('../../stores/questionStore');
var SessionStore = require('../../stores/sessionStore');
var VoteStore = require('../../stores/voteStore');
var LoggedInNavBar = require('../navBar/loggedInNavBar');
var LoggedOutNavBar = require('../navBar/loggedOutNavBar');
var Response = require('./response');

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
  },

  componentWillUnmount: function() {
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
    console.log("New Vote!");
    var vote = {is_up_vote: (direction === "up")};
    var responseId = this.props.params.id;
    VoteActions.createVote(responseId, vote, function(message){
      var ResponsePath = "/responses/" + responseId;
      this.context.router.push(ResponsePath);
    }.bind(this));
    this.setState(this.blankAttributes);
  },

  render: function() {
    var responses, nav;
    if(this.state.question.responses){
      responses = this.state.question.responses.map(function(response){
        return(
          <Response key={response.id} response={response}/>
        );
      });
    }

    nav = SessionStore.isUserLoggedIn() ? <LoggedInNavBar/> : <LoggedOutNavBar/>;

    return (
      <div>
        {nav}
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
            <h3>{this.state.question && this.state.question.title}</h3>
            <p>{this.state.question && this.state.question.body}</p>
            <ul className="list-group">
              {responses}
            </ul>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
        </div>
      </div>


    );
  }

});

module.exports = VoteForm;
