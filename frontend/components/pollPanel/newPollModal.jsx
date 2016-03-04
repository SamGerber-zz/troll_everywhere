var React = require('react');
var Modal = require('boron/DropModal');

var PollActions = require('../../actions/pollActions');


var NewPollModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return ({
          title: this.props.poll.title
      });
    },
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    onSave: function(e){
        e.preventDefault();
        PollActions.createPoll(
          this.state,
          this.hideModal
      );
    },
    _updateTitle: function(e) {
      this.setState({title: e.target.value});
    },

    render: function() {
        return (
            <span>
                <button className="btn btn-default"
                        onClick={this.showModal}>
                  <span className="glyphicon glyphicon-plus" />
                </button>
                <Modal ref="modal">
                    <form className="new-poll-form">
                      <label htmlFor='poll_title'>
                        <h2>Poll Title:
                          <input type="text"
                                 id="poll_title"
                                 value={this.state.title}
                                 placeholder="The title for your poll"
                                 onChange={this._updateTitle}/>
                        </h2>
                      </label>
                      <button type="button"
                          className="btn btn-danger"
                          onClick={this.onSave}>
                          Save
                      </button>
                      <button type="button"
                          className="btn btn-default"
                          onClick={this.hideModal}>
                          Cancel
                      </button>
                    </form>
                </Modal>
            </span>
        );
    }
});


module.exports = NewPollModal;
