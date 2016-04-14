var React = require('react');
var QuestionActions = require('../../actions/questionActions');
var QuestionStore = require('../../stores/questionStore');
var SessionStore = require('../../stores/sessionStore');
var VoteStore = require('../../stores/voteStore');
var Response = require('./response');
var MenuBar = require('./menuBar');
var NextBack = require('./nextBack');
var ReactTooltip = require("react-tooltip");


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
          fullScreen: false,
          showQR: false
    };
  },

  componentWillMount: function() {
    this.questionToken = QuestionStore.addListener(this._onQuestionStoreChange);
    this.voteToken = VoteStore.addListener(this._onVoteStoreChange);
    QuestionActions.fetchQuestionWithId(this.props.params.id);
    this.intervalId = setInterval(QuestionActions.fetchQuestionWithId.bind(null, this.props.params.id), 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalId);
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
    ReactTooltip.hide();
    this.setState({showStats: newShowStats});
  },

  _onNextClick: function(e) {
    var nextQuestionId = this.state.question.next_id;
    ReactTooltip.hide();
    QuestionActions.fetchQuestionWithId(nextQuestionId);
    this.context.router.push('/questions/' + nextQuestionId);
  },

  _onPrevClick: function(e) {
    var prevQuestionId = this.state.question.prev_id;
    ReactTooltip.hide();
    QuestionActions.fetchQuestionWithId(prevQuestionId);
    this.context.router.push('/questions/' + prevQuestionId);
  },

  _onShowQRClick: function(e) {
    var newShowQR = !this.state.showQR;
    ReactTooltip.hide();
    this.setState({showQR: newShowQR});
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
                    showQR={this.state.showQR}
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
          Respond at <strong><a href={"http://trollhere.com/"+SessionStore.currentUser().url_suffix} target='_blank'>trollhere.com/{SessionStore.currentUser().url_suffix}</a></strong>
        </h2>
      );
    } else if (this.state.question) {
      shareText = (
        <h2>
          <span className="glyphicon glyphicon-share" />
          When question is active, respond at <strong><a href={"http://trollhere.com/"+SessionStore.currentUser().url_suffix} target='_blank'>trollhere.com/{SessionStore.currentUser().url_suffix}</a></strong>
        </h2>
      );
    }

    var hidden = (this.state.showQR) ? '' : 'hide';


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
                     onShowStatsClick={this._onShowStatsClick}
                     showQR={this.state.showQR}
                     onShowQRClick={this._onShowQRClick}/>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-1 col-lg-2"></div>
          <div className={'qr-code ' + hidden}>
            <img src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=trollhere.com/' + SessionStore.currentUser().url_suffix}/>
          </div>
        </div>
      </div>


    );
  }

});

module.exports = QuestionView;
