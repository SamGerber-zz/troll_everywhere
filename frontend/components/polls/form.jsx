var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PollActions = require('../../actions/pollActions');

var PollForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  blankAttributes: {
    title: '',
  },

  getInitialState: function () {
    return this.blankAttributes;
  },

  createPoll: function (e) {
    e.preventDefault();
    console.log("New Poll!");
    var poll = this.state;
    PollActions.createPoll(poll, function(pollResponse){
      this.context.router.push("/polls/" + pollResponse.id + "/questions/new/");
    }.bind(this));
    this.setState(this.blankAttributes);
  },

  render: function() {
    return (
      <form className="new-poll-form" onSubmit={this.createPoll}>
        <label htmlFor='poll_title'>
          <span>Title: </span>
            <input type="text"
                   id="poll_title"
                   valueLink={this.linkState("title")}
                   placeholder="My New Poll" />
        </label>
        <button>Create Poll</button>
      </form>
    );
  }

});

module.exports = PollForm;
