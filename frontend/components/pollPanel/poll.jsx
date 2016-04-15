/* React Libraries */
var React = require('react');
var ReactTooltip = require('react-tooltip');

/* React Flux Stores */
var QuestionFilterStore = require('../../stores/questionFilterStore');

/* React Flux Action Creators */
var QuestionFilterActions = require('../../actions/questionFilterActions');
var PollActions = require('../../actions/pollActions');

var EditableItem = require('../dnd/editableItem');
var Modal = require('boron/DropModal');
var NewQuestion = require('../dnd/newQuestion');
var ReactTooltip = require("react-tooltip");
var Mediator = require("../../tour/mediator");


var modalStyle = {
    width: '80%',
    padding: '20px'
};


var Poll = React.createClass({

  getStateFromStore: function () {
    var questions = this.props.poll.questions;
    return ({
      checked: QuestionFilterStore.areCheckedQuestions(questions)
    });
  },

  getInitialState: function(){
    return ({
      checked: false
    });
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
    e.stopPropagation();
    ReactTooltip.hide()
    if (this.state.checked) {
      QuestionFilterActions.toggleChecks(this.props.poll.questions);
    } else {
      QuestionFilterActions.checkAll(this.props.poll.questions);
    }
  },

  updateTitle: function(newTitle) {
    var poll = this.props.poll;
    poll.title = newTitle;
    PollActions.updatePoll(poll);
  },

  showModal: function(){
      Mediator.trigger('show-question-modal');
      this.refs.newQuestionModal.show();
  },
  hideModal: function(){
      this.refs.newQuestionModal.hide();
  },

  deletePoll: function(){
    PollActions.deletePoll(this.props.poll);
    PollActions.fetchAllPolls(this.props.poll.userId);
  },

  render: function() {
    var expandIcon = this.props.expanded ? "triangle-bottom" : "triangle-right";
    var expandTip = this.props.expanded ? "Collapse" : "Expand";
    var selectTip = this.state.checked ? "Deselect all questions" : "Select all questions";
    return (
      <div className="btn-toolbar" onClick={this.props.clickHandler}>
        <div className="row">
          <div className="col-xs-4 col-s-3 col-md-2">
            <div className="btn-group form-inline">
              <div className="btn btn-link">
                <span className={"glyphicon glyphicon-" + expandIcon}
                      aria-hidden="true"
                      data-tip={expandTip}>
                </span>
              </div>
              <div className="btn btn-link">
                <input type="checkbox"
                       className="checkbox"
                       checked={this.state.checked}
                       onClick={this._onCheckBoxChange}
                       data-tip={selectTip}/>
               </div>
            </div>
          </div>
          <div className="col-xs-4 col-s-5 col-md-6">
            <div className="btn-group btn-group-justified form-inline">
              <span className="form-control-static">
                <strong>
                  <EditableItem updateText={this.updateTitle} text={this.props.poll.title} />
                </strong>
              </span>
            </div>
          </div>
          <div className="col-xs-2 col-s-2 col-md-2">
            <button className="btn btn-default new-question"
                    onClick={this.showModal}
                    data-tip="Add question to this poll">
              <span className="glyphicon glyphicon-plus" />
            </button>
            <button className="btn btn-default"
                    onClick={this.deletePoll}
                    data-tip="Delete this poll">
              <span className="glyphicon glyphicon-trash" />
            </button>
          </div>
          <div className="col-xs-2 col-s-2 col-md-2">
            <div className="btn-group pull-right form-inline">
              <span className="form-control-static">
                <strong>{this.props.questionCount}</strong> questions
              </span>
            </div>
          </div>
        </div>
        <Modal ref="newQuestionModal"
          modalStyle={modalStyle}>
          <NewQuestion pollId={this.props.poll.id}
            hideModal={this.hideModal} />
        </Modal>
      </div>
    );
  }

});

module.exports = Poll;
