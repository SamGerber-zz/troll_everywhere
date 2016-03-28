var React = require('react');
// var ConfirmClearModal = require('./confirmClearModal');
var QuestionActions = require('../../actions/questionActions');

var NavBar = React.createClass({

  _onShareClick: function(e) {
    e.preventDefault();
    QuestionActions.updateActiveQuestion(this.props.question);
  },

  _onLockClick: function(e) {
    e.preventDefault();
    if (this.props.question.is_locked) {
      QuestionActions.unlockQuestions([this.props.question.id]);
    } else {
      QuestionActions.lockQuestions([this.props.question.id]);
    }
  },

  render: function() {

    var shareColor = "default";
    var lockColor = "default";
    var statsColor = "info";
    if (this.props.question) {
      if (this.props.question.is_active) {
        shareColor = "success";
      }
      if (this.props.question.is_locked) {
        lockColor = "danger";
      }
      if (!this.props.showStats) {
        statsColor = "default";
      }
    }

    return (
      <div className="btn-toolbar text-center">
          <div className="btn-group-vertical btn-group-lg">
            <button type="button"
                    className={"btn btn-"+shareColor}
                    onClick={this._onShareClick}>
              <span className="glyphicon glyphicon-share" />
            </button>
            <button type="button"
                    className={"btn btn-"+statsColor}
                    onClick={this.props.onShowStatsClick}>
              <span className="glyphicon glyphicon-align-left" />
            </button>
            <button type="button"
                    className={"btn btn-"+lockColor}
                    onClick={this._onLockClick}>
              <span className="glyphicon glyphicon-lock" />
            </button>
          </div>
      </div>
    );
  }

});

module.exports = NavBar;
