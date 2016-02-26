var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var VoteActions = require('../../actions/voteActions');

var VoteForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  blankAttributes: {
    is_up_vote: true
  },

  getInitialState: function () {
    return this.blankAttributes;
  },

  createVote: function (direction, e) {
    e.preventDefault();
    console.log("New Vote!");
    var vote = {is_up_vote: (direction === "up")};
    var responseId = this.props.params.id;
    VoteActions.createVote(responseId, vote, function(message){
      var ResponsePath = "/responses/" + responseId;
      this.context.router.push(ResponsePath);
    }.bind(this));
    this.setState(this.blankAttributes);
  },

  render: function() {
    return (
      <div>
        <form className="new-up-vote"
              onSubmit={this.createVote.bind(this, "up")}>
          <button>Up Vote!</button>
        </form>
        <form className="new-up-vote"
              onSubmit={this.createVote.bind(this, "down")}>
          <button>Down Vote!</button>
        </form>
      </div>
    );
  }

});

module.exports = VoteForm;
