/* React Libraries */
var React = require('react');
var ReactTooltip = require('react-tooltip');

/* React Flux Stores */
var QuestionFilterStore = require('../../stores/questionFilterStore');

/* React Flux Action Creators */
var QuestionFilterActions = require('../../actions/questionFilterActions');
var QuestionActions = require('../../actions/questionActions');
var PollActions = require('../../actions/pollActions');

var Modal = require('boron/DropModal');
var EditQuestion = require('../dnd/editQuestion');
var ReactTooltip = require("react-tooltip");

var modalStyle = {
    width: '80%',
    padding: '20px'
};


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
    ReactTooltip.hide();
    QuestionFilterActions.toggleSingleCheck(this.props.question);
  },

  _onShare: function(e) {
    e.preventDefault();
    ReactTooltip.hide();
    QuestionActions.updateActiveQuestion(this.props.question);
  },

  _onDelete: function(e) {
    e.preventDefault();
    ReactTooltip.hide();
    QuestionActions.deleteQuestion(this.props.question);
  },

  _onLockClick: function(e) {
    e.preventDefault();
    ReactTooltip.hide();
    if (this.props.question.is_locked) {
      QuestionActions.unlockQuestions([this.props.question.id]);
    } else {
      QuestionActions.lockQuestions([this.props.question.id]);
    }
  },

  _onCopy: function(e) {
    e.preventDefault();
    ReactTooltip.hide();
    var q = this.props.question;
    q.responses.forEach(function(response){
      delete response.id;
    });
    q.responses_attributes = q.responses;
    var pId = this.props.pollId;
    q.ord = this.props.questionOrd;
    QuestionActions.createQuestion(pId, q);
  },

  showModal: function(){
      this.refs.editQuestionModal.show();
  },
  hideModal: function(){
      this.refs.editQuestionModal.hide();
  },

  render: function() {
    var votes = this.props.question.responses && this.props.question.responses.reduce(function(previousValue, response) {
            return previousValue + response.votes.length;
    }, 0);

    var lock = this.props.question.is_locked ? "lock" : "tasks";
    var share = this.props.question.is_active ? "eye-close" : "blackboard" ;
    var shareTip = this.props.question.is_active ? "Deactivate question" : "Activate question";
    var lockTip = this.props.question.is_locked ?
      "Question is locked. To allow voting, unlock." :
      "Question is unlocked.";
    var selectTip = this.state.checked ? "Deselect Question" : "Select Question";
    return (
      <div>
        <div className="btn-toolbar">
          <div className="row">
            <div className="col-xs-4 col-s-3 col-md-2">
              <div className="btn-group">
                <div className="btn btn-link btn-xs">
                  <span className={"glyphicon glyphicon-"+lock}
                        aria-hidden="true"
                        data-tip={lockTip}
                        onClick={this._onLockClick}>
                  </span>
                </div>

                <div className="btn btn-link btn-xs">
                  <input type="checkbox"
                         className="poll-panel-poll-checkbox"
                         checked={this.state.checked}
                         onChange={this._onCheckBoxChange}
                         data-tip={selectTip}/>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-s-5 col-md-7">
              <div className="btn-group "
                   data-tip="View Question"
                   onClick={this.props.clickHandler}>
                <button className="btn-link">
                  {this.props.question.title}
                </button>
              </div>
            </div>
            <div className="col-xs-4 col-s-4 col-md-3">
              <div className="btn-group btn-group-justified">
                <div className="btn btn-xs no-outline">
                  <span className="glyphicon glyphicon-edit"
                        onClick={this.showModal}
                        data-tip="Edit question"/>
                </div>
                <div className="btn btn-xs" onClick={this._onCopy}>
                  <span className={"glyphicon glyphicon-copy"}
                        aria-hidden="true"
                        data-tip="Duplicate question">
                  </span>
                </div>
                <div className="btn btn-xs" onClick={this._onShare}>
                  <span className={"glyphicon glyphicon-"+share}
                        aria-hidden="true"
                        data-tip={shareTip}>
                  </span>
                </div>
                <div className="btn btn-xs" onClick={this._onDelete}>
                  <span className={"glyphicon glyphicon-trash"}
                        aria-hidden="true"
                        data-tip="Delete Question">
                  </span>
                </div>
                <div className="btn btn-link btn-xs"
                     onClick={this.props.clickHandler}
                     data-tip="View Question">
                  {votes} votes
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal ref="editQuestionModal"
          modalStyle={modalStyle}>
          <EditQuestion question={this.props.question}
            hideModal={this.hideModal} />
        </Modal>
      </div>
    );
  }

});

module.exports = Question;
