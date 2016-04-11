var React = require('react');
var Modal = require('boron/DropModal');
var NewQuestion = require('../dnd/newQuestion')
var ReactTooltip = require("react-tooltip");

var modalStyle = {
    width: '80%',
    padding: '20px'
};


var QuestionActions = require('../../actions/pollActions');


var NewQuestionModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return ({
          title: this.props.poll.title
      });
    },
    showModal: function(){
        this.refs.newQuestionModal.show();
    },
    hideModal: function(){
        this.refs.newQuestionModal.hide();
    },
    onSave: function(e){
        e.preventDefault();
        QuestionActions.createQuestion(
          this.props.poll.id,
          this.state,
          this.hideModal
      );
    },
    _updateTitle: function(e) {
      this.setState({title: e.target.value});
    },

    render: function() {
        return (
            <div >
                <button className="btn btn-default"
                        onClick={this.showModal}
                        data-tip="Add question to this poll">
                  <span className="glyphicon glyphicon-plus" />
                </button>
                <Modal ref="newQuestionModal" modalStyle={modalStyle}>
                    <NewQuestion pollId={this.props.poll.id}
                                 hideModal={this.hideModal} />
                </Modal>
            </div>
        );
    }
});


module.exports = NewQuestionModal;
