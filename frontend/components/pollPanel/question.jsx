var React = require('react');
var QuestionFilterStore = require('../../stores/questionFilterStore');
var QuestionFilterActions = require('../../actions/questionFilterActions');

var Question = React.createClass({

  getStateFromStore: function () {
    return ({
      checked: QuestionFilterStore.isCheckedQuestion(this.props.question)
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

  render: function() {
    var votes = this.props.question.vote_count;

    return (
      <div className="poll-panel-poll group">
        <ul className="poll-panel-poll-left">
          <li className="poll-panel-poll-type">💡</li>
          <li className="poll-panel-poll-checkbox">
            <input type="checkbox"
                   className="poll-panel-poll-checkbox"
                   checked={this.state.checked}
                   onChange={this._onCheckBoxChange}/>
          </li>
          <li className="poll-panel-poll-name">{this.props.question.title}</li>
        </ul>
        <ul className="poll-panel-poll-right">
          <li className="poll-panel-poll-responses">
            <a className="poll-panel-poll-link" href="#">{votes} Votes</a>
          </li>
          <li className="poll-panel-poll-edit">
            <a className="poll-panel-poll-link" href="#">edit</a>
          </li>
          <li className="poll-panel-poll-copy">
            <a className="poll-panel-poll-link" href="#">copy</a>
          </li>
          <li className="poll-panel-poll-share">
            <a className="poll-panel-poll-link" href="#">share</a>
          </li>
          <li className="poll-panel-poll-name">🔒</li>
        </ul>
      </div>

    );
  }

});

module.exports = Question;
