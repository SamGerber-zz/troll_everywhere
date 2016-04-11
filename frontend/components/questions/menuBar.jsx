var React = require('react');
// var ConfirmClearModal = require('./confirmClearModal');
var QuestionActions = require('../../actions/questionActions');
var ReactTooltip = require("react-tooltip");


var NavBar = React.createClass({

  _onShareClick: function(e) {
    e.preventDefault();
    ReactTooltip.hide();
    QuestionActions.updateActiveQuestion(this.props.question);
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

  render: function() {

    var shareColor = "default";
    var shareTip = "Activate question";
    var shareIcon = "blackboard";
    var lockColor = "default";
    var lockTip = "Lock question";
    var statsColor = "info";
    var showStatsTip = "Hide vote counts";
    var qRColor = "default";
    var qRTip = "Show QR code";
    if (this.props.question) {
      if (this.props.question.is_active) {
        shareColor = "success";
        shareTip = "Deactivate question";
        shareIcon = "eye-close";
      }
      if (this.props.question.is_locked) {
        lockColor = "danger";
        lockTip = "Unlock question";
      }
      if (!this.props.showStats) {
        statsColor = "default";
        showStatsTip = "Show vote counts";
      }
      if (this.props.showQR) {
        qRColor = "info";
        qRTip = "Hide QR code";
      }
    }

    return (
      <div className="btn-toolbar text-center">
          <div className="btn-group-vertical btn-group-lg">
            <button type="button"
                    className={"btn btn-"+shareColor}
                    onClick={this._onShareClick}
                    data-tip={shareTip}>
              <span className={"glyphicon glyphicon-" + shareIcon} />
            </button>
            <button type="button"
                    className={"btn btn-"+statsColor}
                    onClick={this.props.onShowStatsClick}
                    data-tip={showStatsTip}>
              <span className="glyphicon glyphicon-align-left" />
            </button>
            <button type="button"
                    className={"btn btn-"+lockColor}
                    onClick={this._onLockClick}
                    data-tip={lockTip}>
              <span className="glyphicon glyphicon-lock" />
            </button>
            <button type="button"
                    className={"btn btn-"+qRColor}
                    onClick={this.props.onShowQRClick}
                    data-tip={qRTip}>
              <span className="glyphicon glyphicon-qrcode" />
            </button>
          </div>
      </div>
    );
  }

});

module.exports = NavBar;
