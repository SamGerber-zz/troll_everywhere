var React = require('react');
var PropTypes = React.PropTypes;
var update = require('react/lib/update');
var Response = require('./response');
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('./itemTypes');
var flow = require('lodash/flow');
var EditableItem = require('./editableItem');
var ReactTooltip = require("react-tooltip");
var QuestionFormStore = require('../../stores/questionFormStore');
var QuestionFormActions = require('../../actions/questionFormActions');
var PollActions = require('../../actions/pollActions');


var style = {
  // width: 400
};

var responseTarget = {
  drop: function() {
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var Container = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired
  },

  getStateFromStore: function() {
    return (
      QuestionFormStore.getQuestion()
    );
  },

  componentDidMount: function() {
    this.token = QuestionFormStore.addListener(this.setState.bind(this, this.getStateFromStore));
    if (this.props.pollId) {
      QuestionFormActions.fetchBlankQuestionFormForPollWithId(this.props.pollId);
    } else {
      QuestionFormActions.fetchQuestionFormForQuestionWithId(this.props.question.id);
    }
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  moveResponse: function(ord, atIndex) {
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    this.setState(update(this.state, {
      responses: {
        $splice: [
          [index, 1],
          [atIndex, 0, response]
        ]
      }
    }));
  },

  addResponse: function() {
    var nextOrd = 1 + this.state.responses.reduce(function(maxOrd, response){
      return Math.max(maxOrd, response.ord);
    }, 0);
    this.setState(update(this.state, {
      responses: {
        $push: [{
          ord: nextOrd,
          body: 'New Response',
          votes: 0
        }]
      }
    }));
  },

  deleteResponse: function(ord){
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    ReactTooltip.hide();
    if (response.id) {
      var state = { responses: {} };
      state.responses[index] = { _destroy: {
        $set: true }
      };

      this.setState(update(this.state, state));
    } else {
      this.setState(update(this.state, {
        responses: {
          $splice: [
            [index, 1]
          ]
        }
      }));
    }
  },

  updateText: function(ord, body) {
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    var state = { responses: {} };
    state.responses[index] = { body: {
      $set: body }
    };

    this.setState(update(this.state, state));
  },

  findResponse: function(ord) {
    var responses = this.state.responses;
    var response = responses.filter(function(response) {
      return response.ord === ord;
    })[0];

    return {
      response: response,
      index: responses.indexOf(response)
    };
  },

  updateTitle: function(text){
    this.setState({
      title: text
    });
  },

  updateBody: function(text){
    this.setState({
      body: text
    });
  },

  saveQuestion: function(){
    var question = this.state;
    question.responses.map(function(response, index){
      response.ord = index;
      return response;
    }, this);
    if (question.id) {
      QuestionFormActions.updateQuestion(question.id, question)
    } else {
      QuestionFormActions.createQuestion(question.poll_id, question)
    }
    ReactTooltip.hide();
    this.props.hideModal();
  },

  cancelQuestion: function(){
    ReactTooltip.hide();
    this.props.hideModal();
  },

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    var responses = this.state.responses;
    var title = this.state.title;
    var body = this.state.body;
    var updateTitle = this.updateTitle;
    var updateBody = this.updateBody;

    var responseComponents = connectDropTarget(
      <div style={style}>
        {responses.map(response => {
          if (!response._destroy) {
            return (
              <Response key={response.ord}
                    ord={response.ord}
                    id={response.id}
                    body={response.body}
                    votes={response.votes}
                    moveResponse={this.moveResponse}
                    findResponse={this.findResponse}
                    deleteResponse={this.deleteResponse}
                    updateText={this.updateText} />
                );}
              }
            )}
      </div>
    );

    return (
      <div>
        <h2>
          <EditableItem updateText={updateTitle}
                        text={title} />
        </h2>
        <h3>
          <EditableItem updateText={updateBody}
            text={body} />
        </h3>
        {responseComponents}
        <div>
        <button type="button"
                className="btn btn-default pull-left"
                onClick={this.addResponse}
                data-tip="Add a new response">Add Response</button>
        </div>
        <div className="btn-group pull-right" role="group" aria-label="...">
          <button type="button"
                  className="btn btn-info"
                  onClick={this.saveQuestion}
                  data-tip="Save Question">Save Question</button>
          <button type="button"
                  className="btn btn-danger"
                  onClick={this.cancelQuestion}
                  data-tip="Cancel">Cancel</button>
        </div>
      </div>

    );
  }
});

module.exports = DropTarget(ItemTypes.RESPONSE, responseTarget, collect)(Container);
