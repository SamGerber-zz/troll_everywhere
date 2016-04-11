var React = require('react');
var Modal = require('boron/DropModal');
var EditQuestion = require('../dnd/editQuestion');
var ReactTooltip = require("react-tooltip");

var modalStyle = {
    width: '80%'
};



var QuestionActions = require('../../actions/pollActions');


var EditQuestionModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    showModal: function(){
        this.refs.editQuestionModal.show();
    },
    hideModal: function(){
        this.refs.editQuestionModal.hide();
    },
    onSave: function(e){
        e.preventDefault();
        QuestionActions.updateQuestion(
          this.props.question,
          this.state,
          this.hideModal
      );
    },
    _updateTitle: function(e) {
      this.setState({title: e.target.value});
    },

    render: function() {
        return (
              <div className="btn btn-xs">
                <span className="glyphicon glyphicon-edit"
                      onClick={this.showModal}
                      data-tip="Edit question"/>
                  <Modal ref="editQuestionModal"
                      modalStyle={modalStyle}>
                      <EditQuestion question={this.props.question}
                          hideModal={this.hideModal} />
                  </Modal>
              </div>
        );
    }
});


module.exports = EditQuestionModal;
