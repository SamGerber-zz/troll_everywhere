/* React Libraries */
var React = require('react');

/* React Flux Stores */
var QuestionFilterStore = require('../../stores/questionFilterStore');

/* React Flux Action Creators */
var QuestionFilterActions = require('../../actions/questionFilterActions');

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
    if (this.state.checked) {
      QuestionFilterActions.toggleChecks(this.props.poll.questions);
    } else {
      QuestionFilterActions.checkAll(this.props.poll.questions);
    }
  },

  render: function() {
    var expandIcon = this.props.expanded ? "triangle-bottom" : "triangle-right";
    return (
      <div className="btn-toolbar" onClick={this.props.clickHandler}>
        <div className="row">
          <div className="col-xs-4 col-s-3 col-md-2">
            <div className="btn-group form-inline">
              <div className="btn btn-link">
                <span className={"glyphicon glyphicon-" + expandIcon}
                      aria-hidden="true">
                </span>
              </div>
              <div className="btn btn-link">
                <input type="checkbox"
                       className="checkbox"
                       checked={this.state.checked}
                       onClick={this._onCheckBoxChange}/>
               </div>
            </div>
          </div>
          <div className="col-xs-4 col-s-6 col-md-8">
            <div className="btn-group btn-group-justified form-inline">
              <span className="form-control-static">
                <strong>{this.props.poll.title}</strong>
              </span>
            </div>
          </div>
          <div className="col-xs-4 col-s-3 col-md-2">
            <div className="btn-group pull-right form-inline">
              <span className="form-control-static">
                <strong>{this.props.questionCount}</strong> questions
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Poll;
