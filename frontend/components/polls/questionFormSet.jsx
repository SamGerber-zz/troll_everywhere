var React = require('react');
var PollFormActions = require('../../actions/pollFormActions');
var PollFormStore = require('../../stores/pollFormStore');
var ResponseFormSet = require('./responseFormSet');

var QuestionForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function() {
    var questionIndex = this.props.questionIndex;

    return (
      PollFormStore.getQuestion(questionIndex)
    );
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  _updateTitle: function(e) {
    this.setState({title: e.target.value});
    PollFormActions.updateQuestion(
      this.props.questionIndex,
      Object.assign(this.state, {title: e.target.value})
    );
  },

  _updateBody: function(e) {
    this.setState({body: e.target.value});
    PollFormActions.updateQuestion(
      this.props.questionIndex,
      Object.assign(this.state, {body: e.target.value})
    );
  },

  _updateImageUrl: function(e) {
    this.setState({image_url: e.target.value});
    PollFormActions.updateQuestion(
      this.props.questionIndex,
      Object.assign(this.state, {image_url: e.target.value})
    );
  },

  componentDidMount: function() {
    this.token = PollFormStore.addListener(this.getStateFromStore);
  },

  componentWillUnmount: function() {
    this.token.remove();
  },


  render: function() {
    if (this.state.responses) {
      var responses = this.state.responses.map(function(response, i) {
        return (
          <ResponseFormSet questionIndex={this.props.questionIndex}
                           responseIndex={i} key={i}/>
         );
      }, this);
    } else {
      responses = [];
    }

    return (
      <fieldset className="form-horizontal">
        <h3>Question {this.props.questionIndex + 1}: </h3>

        <label htmlFor='question_title'>Title: </label>
            <input className="form-control"
                   type="text"
                   id="question_title"
                   value={this.state.title}
                   placeholder="The title for your question"
                   onChange={this._updateTitle}/>
        <label htmlFor='question_title'>Body: </label>
            <input className="form-control"
                   type="text"
                   id="question_body"
                   value={this.state.body}
                   placeholder="The body for your question"
                   onChange={this._updateBody}/>
        <label htmlFor='question_title'>Image_url: </label>
            <input className="form-control"
                   type="text"
                   id="question_image_url"
                   value={this.state.image_url}
                   placeholder="The url for an image TODO"
                   onChange={this._updateImageUrl}/>

        <div className="well">
          {responses}
        </div>
      </fieldset>
    );
  }

});

module.exports = QuestionForm;
