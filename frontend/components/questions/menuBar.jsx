var React = require('react');
var Modal = require('react-modal');
var QuestionActions = require('../../actions/questionActions');

var appElement = document.getElementById('response-pane');

var NavBar = React.createClass({

  getInitialState: function () {
    return ({
      modalOpen: false
    });
  },

  modalOptions: {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '30%',
    left                       : '30%',
    right                      : '30%',
    bottom                     : '30%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
},

  _onShareClick: function(e) {
    e.preventDefault();
    QuestionActions.updateActiveQuestion(this.props.question);
  },

  _onEraseVotesClick: function(e) {
    e.preventDefault();
    this.setState({ modalOpen: true });
  },

  _onEraseVotesConfirm: function(e) {
    e.preventDefault();
    console.log("AHHHHHH!");
    this.setState({ modalOpen: false });
  },

  _onEraseVotesCancel: function(e) {
    e.preventDefault();
    this.setState({ modalOpen: false });
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
    Modal.setAppElement(appElement);

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
            <button type="button"
                    className="btn btn-default"
                    onClick={this._onEraseVotesClick}>
              <span className="glyphicon glyphicon-erase" />
            </button>
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this._onEraseVotesCancel}
              closeTimeoutMS={500}
              style={this.modalOptions}>

              <h1>Are you sure?</h1>
              <p>This irreversible operation will clear out all votes to this question</p>
              <button type="button"
                      className="btn btn-danger"
                      onClick={this._onEraseVotesConfirm}>
                Clear all votes
              </button>
              <button type="button"
                      className="btn btn-default"
                      onClick={this._onEraseVotesCancel}>
                Cancel
              </button>
            </Modal>
            <button type="button"
                    className="btn btn-default">
              <span className="glyphicon glyphicon-fullscreen" />
            </button>
          </div>
      </div>
    );
  }

});

module.exports = NavBar;
