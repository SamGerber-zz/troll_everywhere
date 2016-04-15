var React = require('react');
var Modal = require('boron/DropModal');
var ReactTooltip = require("react-tooltip");


var PollActions = require('../../actions/pollActions');

var EditableItem = require('../dnd/editableItem');

var Mediator = require('../../tour/mediator');


var modalStyle = {
    padding: '20px'
};


var NewPollModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return ({
          title: 'title'
      });
    },
    showModal: function(){
        ReactTooltip.hide();
        Mediator.trigger('show-poll-modal');
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    onSave: function(e){
        e.preventDefault();
        Mediator.trigger('save-new-poll');
        PollActions.createPoll(
          this.state,
          this.hideModal
      );
    },
    _updateTitle: function(title) {
      Mediator.trigger('edit-poll-title');
      this.setState({title: title});
    },

    render: function() {
        return (
            <span id="tour-5">
                <button className="btn btn-default"
                        data-tip="Add a new poll"
                        onClick={this.showModal}>
                  <span className="glyphicon glyphicon-plus"/>
                </button>
                <Modal ref="modal" modalStyle={modalStyle}>
                    <div id="tour-6">
                        <header>
                          <h1>New Poll!!</h1>
                        </header>
                        <EditableItem updateText={this._updateTitle}
                            text={this.state.title}/>
                        <form className="new-poll-form">
                          <button type="button"
                              id="tour-7"
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
                    </div>
                </Modal>
            </span>
        );
    }
});


module.exports = NewPollModal;
