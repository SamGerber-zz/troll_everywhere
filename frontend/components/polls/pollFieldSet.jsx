var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PollFormActions = require('../../actions/pollFormActions');
var PollFormStore = require('../../stores/pollFormStore');

var PollForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function() {
    return (
      { poll: PollFormStore.poll }
    );
  },

  getInitialState: function () {
    return this.getStateFromStore;
  },

  createPoll: function (e) {
    e.preventDefault();
    var poll = this.state;
    PollFormActions.submitPollForm(function(message){
      var newQuestionUrl = "/polls/" + message.id;
      this.context.router.push(newQuestionUrl);
    }.bind(this));
    this.setState(this.getStateFromStore);
  },

  render: function() {
    return (
      <form className="new-poll-form" onSubmit={this.createPoll}>
        <PollFieldSet title={this.state.poll.title} />
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
