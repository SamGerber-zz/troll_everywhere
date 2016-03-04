var React = require('react');
var VoteActions = require('../../actions/voteActions');
var QuestionActions = require('../../actions/questionActions');
var QuestionStore = require('../../stores/questionStore');
var SessionStore = require('../../stores/sessionStore');
var VoteStore = require('../../stores/voteStore');
var Response = require('./response');
var MenuBar = require('./menuBar');
var NextBack = require('./nextBack');

var QuestionView = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _getStateFromStore: function() {
    return {
      question: QuestionStore.find(this.props.params.id),
    };
  },

  getInitialState: function () {
    return {
          question: QuestionStore.find(this.props.params.id),
          showStats: true,
          fullScreen: false
    };
  },

  componentWillMount: function() {
    this.questionToken = QuestionStore.addListener(this._onQuestionStoreChange);
    this.voteToken = VoteStore.addListener(this._onVoteStoreChange);
    QuestionActions.fetchQuestionWithId(this.props.params.id);
    setInterval(QuestionActions.fetchQuestionWithId.bind(null, this.props.params.id), 1000);
  },

  componentWillUnmount: function() {
    this.questionToken.remove();
    this.voteToken.remove();
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      question: QuestionStore.find(newProps.params.id),
    });
  },

  _onQuestionStoreChange: function() {
    this.setState(this._getStateFromStore());
  },

  _onVoteStoreChange: function() {
    QuestionActions.fetchQuestionWithId(this.props.params.id);
  },

  _onShowStatsClick: function(e) {
    var newShowStats = !this.state.showStats;
    this.setState({showStats: newShowStats});
  },

  _onNextClick: function(e) {
    var nextQuestionId = this.state.question.next_id;
    QuestionActions.fetchQuestionWithId(nextQuestionId);
    this.context.router.push('/questions/' + nextQuestionId);
  },

  _onPrevClick: function(e) {
    var prevQuestionId = this.state.question.prev_id;
    QuestionActions.fetchQuestionWithId(prevQuestionId);
    this.context.router.push('/questions/' + prevQuestionId);
  },

  render: function() {
    var responses, percentage, shareText;
    if(this.state.question){
      var question = this.state.question;
      var maxVotes = 0;
      question.responses.forEach(function(response){
        maxVotes = Math.max(response.votes.length, maxVotes);
      });
      responses = question.responses.map(function(response){
        percentage = Math.round(100 * response.votes.length / maxVotes);
        return(
          <Response key={response.id}
                    response={response}
                    percentage={percentage}
                    showStats={this.state.showStats}/>
        );
      }, this);

    }

    if (this.state.question && this.state.question.is_locked) {
      shareText = (
        <h2>
          <span className="glyphicon glyphicon-lock"/>
          <strong>Question locked.</strong> Responses not accepted.
        </h2>
      );
    } else if (this.state.question && this.state.question.is_active) {
      shareText = (
        <h2>
          <span className="glyphicon glyphicon-blackboard"/>
          Respond at <strong>trollhere.com/{SessionStore.currentUser().url_suffix}</strong>
        </h2>
      );
    } else if (this.state.question) {
      shareText = (
        <h2>
          <span className="glyphicon glyphicon-share" />
          When question is active, respond at <strong>trollhere.com/{SessionStore.currentUser().url_suffix}</strong>
        </h2>
      );
    }


    return (
      <div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6">
            <NextBack question={this.state.question}
                      onNextClick={this._onNextClick}
                      onPrevClick={this._onPrevClick}/>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
        </div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 text-center">
            {shareText}
          </div>
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
        </div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6">
            <h1>{this.state.question && this.state.question.title}</h1>
            <h2>{this.state.question && this.state.question.body}</h2>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
        </div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2 col-lg-3"></div>
          <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6" id="response-pane">
            <ul className="list-group">
              {responses}
            </ul>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-1 col-lg-1">
            <MenuBar question={this.state.question}
                     showStats={this.state.showStats}
                     onShowStatsClick={this._onShowStatsClick}/>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-1 col-lg-2"></div>
        </div>
      </div>


    );
  }

});

module.exports = QuestionView;
