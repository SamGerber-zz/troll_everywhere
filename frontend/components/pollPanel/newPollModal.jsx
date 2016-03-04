var React = require('react');
var Modal = require('react-modal');
var PollActions = require('../../actions/pollActions');

var appElement = document.getElementById('poll-pane');

var NewPollForm = React.createClass({

  getInitialState: function () {
    return ({
      modalOpen: this.props.open,
      poll: this.props.poll
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

  _onSubmitClick: function(e) {
    e.preventDefault();
    PollActions.createPoll(this.state.poll);
    this.setState({modalOpen: false});
  },

  _onCancelClick: function(e) {
    e.preventDefault();
    this.setState({ modalOpen: false });
  },

  _onTitleChange: function(e) {
    e.preventDefault();
    this.setState({ poll: { title: e.currentTarget.value } });
  },

  render: function() {

    Modal.setAppElement(appElement);
    return (
      <Modal
        isOpen={this.props.modalOpen}
        onRequestClose={this._onCancelClick}
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
    );
  }

});

module.exports = NewPollForm;
