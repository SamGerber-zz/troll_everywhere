/* React Libraries */
var React = require('react');

/* React Flux Stores */
var QuestionFilterStore = require('../../stores/questionFilterStore');

/* React Flux Action Creators */
var QuestionFilterActions = require('../../actions/questionFilterActions');
var QuestionActions = require('../../actions/questionActions');
var PollActions = require('../../actions/pollActions');

var Question = React.createClass({

  getStateFromStore: function () {
    return ({
      checked: QuestionFilterStore.isCheckedQuestion(this.props.question),
    });
  },

  getInitialState: function(){
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.QuestionFilterStoreToken = QuestionFilterStore
      .addListener(this._onQuestionFilterStoreChange);
  },

  componentWillUnmount: function () {
    this.QuestionFilterStoreToken.remove();
  },

  _onQuestionFilterStoreChange: function() {
    this.setState(this.getStateFromStore());
  },

  _onCheckBoxChange: function(e) {
    QuestionFilterActions.toggleSingleCheck(this.props.question);
  },

  _onShare: function(e) {
    e.preventDefault();
    QuestionActions.updateActiveQuestion(this.props.question);
  },

  _onCopy: function(e) {
    e.preventDefault();
    var q = this.props.question;
    q.responses.forEach(function(response){
      delete response.id;
    });
    q.responses_attributes = q.responses;
    var pId = this.props.pollId;
    q.ord = this.props.questionOrd;
    QuestionActions.createQuestion(pId, q);
    PollActions.fetchAllPolls();
  },

  render: function() {
    var votes = this.props.question.responses && this.props.question.responses.reduce(function(previousValue, response) {
            return previousValue + response.votes.length;
    }, 0);

    var lock = this.props.question.is_locked ? "lock" : "none";
    var share = this.props.question.is_active ? "unchecked" : "share" ;
    return (
      <div className="btn-toolbar">
        <div className="row">
          <div className="col-xs-4 col-s-3 col-md-2">
            <div className="btn-group">
              <div className="btn btn-link btn-xs">
                <span className={"glyphicon glyphicon-"+lock}
                      aria-hidden="true">
                </span>
              </div>

              <div className="btn btn-link btn-xs">
                <input type="checkbox"
                       className="poll-panel-poll-checkbox"
                       checked={this.state.checked}
                       onChange={this._onCheckBoxChange}/>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-s-6 col-md-8">
            <div className="btn-group "
                 onClick={this.props.clickHandler}>
              <button className="btn-link" >
                {this.props.question.title}
              </button>
            </div>
          </div>
          <div className="col-xs-4 col-s-3 col-md-2">
            <div className="btn-group btn-group-justified">
              <div className="btn btn-xs">
                <span className={"glyphicon glyphicon-edit"}
                      aria-hidden="true">
                </span>
              </div>
              <div className="btn btn-xs" onClick={this._onCopy}>
                <span className={"glyphicon glyphicon-copy"}
                      aria-hidden="true">
                </span>
              </div>
              <div className="btn btn-xs" onClick={this._onShare}>
                <span className={"glyphicon glyphicon-"+share}
                      aria-hidden="true">
                </span>
              </div>
              <div className="btn btn-link btn-xs"
                   onClick={this.props.clickHandler}>
                {votes} votes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Question;
