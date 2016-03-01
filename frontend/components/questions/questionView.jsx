var React = require('react');
var VoteActions = require('../../actions/voteActions');
var QuestionActions = require('../../actions/questionActions');
var QuestionStore = require('../../stores/questionStore');
var VoteStore = require('../../stores/voteStore');
var Response = require('./response');

var QuestionView = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _getStateFromStore: function() {
    return { question: QuestionStore.find(this.props.params.id) };
  },

  getInitialState: function () {
    return this._getStateFromStore();
  },

  componentWillMount: function() {
    this.questionToken = QuestionStore.addListener(this._onQuestionStoreChange);
    this.voteToken = VoteStore.addListener(this._onVoteStoreChange);
    QuestionActions.fetchQuestionWithId(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.questionToken.remove();
    this.voteToken.remove();
  },

  _onQuestionStoreChange: function() {
    this.setState(this._getStateFromStore());
  },

  _onVoteStoreChange: function() {
    QuestionActions.fetchQuestionWithId(this.props.params.id);
  },

  render: function() {
    var responses, percentage;
    if(this.state.question){
      var question = this.state.question;
      var maxVotes = 0;
      question.responses.forEach(function(response){
        maxVotes = Math.max(response.votes_count, maxVotes);
      });
      responses = question.responses.map(function(response){
        percentage = Math.round(100 * response.votes_count / maxVotes);
        return(
          <Response key={response.id} response={response} percentage={percentage}/>
        );
      });

    }


    return (
      <div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
            <h1>{this.state.question && this.state.question.title}</h1>
            <h2>{this.state.question && this.state.question.body}</h2>
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

module.exports = QuestionView;
