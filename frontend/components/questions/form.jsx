var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var QuestionActions = require('../../actions/questionActions');

var QuestionForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  blankAttributes: {
    title: '',
    body: '',
    image_url: '',
  },

  getInitialState: function () {
    return this.blankAttributes;
  },

  createQuestion: function (e) {
    e.preventDefault();
    console.log("New Question!");
    var question = this.state;
    var pollId = this.props.params.id;
    QuestionActions.createQuestion(pollId, question, function(questionResponse){
      this.context.router.push("/questions/" + questionResponse.id + "/responses/new/");
    });
    this.setState(this.blankAttributes);
  },

  render: function() {
    return (
      <form className="new-question-form" onSubmit={this.createQuestion}>
        <label htmlFor='question_title'>
          <span>Title: </span>
            <input type="text"
                   id="question_title"
                   valueLink={this.linkState("title")}
                   placeholder="The question's title" />
        </label>
        <label htmlFor='question_title'>
          <span>Body: </span>
            <input type="text"
                   id="question_body"
                   valueLink={this.linkState("body")}
                   placeholder="The text for your question" />
        </label>
        <label htmlFor='question_title'>
          <span>Image_url: </span>
            <input type="text"
                   id="question_image_url"
                   valueLink={this.linkState("image_url")}
                   placeholder="The url for an image TODO" />
        </label>
        <button>Create Question</button>
      </form>
    );
  }

});

module.exports = QuestionForm;
