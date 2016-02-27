var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ResponseActions = require('../../actions/responseActions');

var ResponseForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  blankAttributes: {
    body: '',
    image_url: ''
  },

  getInitialState: function () {
    return this.blankAttributes;
  },

  createResponse: function (e) {
    e.preventDefault();
    console.log("New Response!");
    var response = this.state;
    var questionId = this.props.params.id;
    ResponseActions.createResponse(questionId, response, function(message){
      var ResponseIndexUrl = "/questions/" + questionId + "/responses/";
      this.context.router.push(ResponseIndexUrl);
    }.bind(this));
    this.setState(this.blankAttributes);
  },

  render: function() {
    return (
      <form className="new-response-form" onSubmit={this.createResponse}>
        <label htmlFor='response_title'>
          <span>Body: </span>
            <input type="text"
                   id="response_body"
                   valueLink={this.linkState("body")}
                   placeholder="The text for your response" />
        </label>
        <label htmlFor='response_title'>
          <span>Image_url: </span>
            <input type="text"
                   id="response_image_url"
                   valueLink={this.linkState("image_url")}
                   placeholder="The url for an image TODO" />
        </label>
        <button>Create Response</button>
      </form>
    );
  }

});

module.exports = ResponseForm;
