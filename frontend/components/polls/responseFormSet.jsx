var React = require('react');
var PollFormActions = require('../../actions/pollFormActions');
var PollFormStore = require('../../stores/pollFormStore');

var ResponseForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function() {
    var questionIndex = this.props.questionIndex;
    var responseIndex = this.props.responseIndex;

    return (
      PollFormStore.getResponse(questionIndex, responseIndex)
    );
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  _updateBody: function(e) {
    this.setState({body: e.target.value});
    PollFormActions.updateResponse(
      this.props.questionIndex,
      this.props.responseIndex,
      Object.assign(this.state, {body: e.target.value})
     );
  },

  _updateImageUrl: function(e) {
    this.setState({image_url: e.target.value});
    PollFormActions.updateResponse(
      this.props.questionIndex,
      this.props.responseIndex,
      Object.assign(this.state, {image_url: e.target.value})
     );  },

  componentDidMount: function() {
    this.token = PollFormStore.addListener(this.getStateFromStore);
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  render: function() {

    return (
      <fieldset className="form-inline bg-info">
        <h4>Response {this.props.responseIndex + 1}: </h4>
        <label htmlFor='response_body'>Body: </label>
        <input className="form-control"
               type="text"
               id="response_body"
               value={this.state.body}
               placeholder="Text"
               onChange={this._updateBody}/>
        <label htmlFor='response_image_url'>Image_url: </label>
        <input className="form-control"
               type="text"
               id="response_image_url"
               value={this.state.image_url}
               placeholder="Url for an image"
               onChange={this._updateImageUrl}/>
      </fieldset>
    );
  }

});

module.exports = ResponseForm;
