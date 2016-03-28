var React = require('react');
var Modal = require('boron/DropModal');

var QuestionActions = require('../../actions/questionActions');


var ConfirmClearModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return ({
          question: this.props.question
      });
    },
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    _onEraseVotesConfirm: function(e){
        e.preventDefault();
        QuestionActions.clearResponses(
          this.props.question,
          this.hideModal
      );
    },

    render: function() {
        return (
            <span>
                <button className="btn btn-lg"
                        onClick={this.showModal}>
                  <span className="glyphicon glyphicon-erase" />
                </button>
                <Modal ref="modal">
                  <h1>Are you sure?</h1>
                  <p>This irreversible operation will clear out all votes to this question</p>
                  <button type="button"
                          className="btn btn-danger"
                          onClick={this._onEraseVotesConfirm}>
                    Clear all votes
                  </button>
                  <button type="button"
                          className="btn btn-default"
                          onClick={this.hideModal}>
                    Cancel
                  </button>
                </Modal>
            </span>
        );
    }
});


module.exports = ConfirmClearModal;
