var React = require('react');
var VoteActions = require('../../actions/voteActions');
var ResponseStore = require('../../stores/responseStore');
var QuestionStore = require('../../stores/questionStore');

var Response = React.createClass({

  createVote: function (direction, e) {
    e.preventDefault();
    console.log("New Vote!");
    var vote = {is_up_vote: true};
    var responseId = this.props.response.id;
    VoteActions.createVote(responseId, vote);
  },

  render: function() {
    return (
      <a href="#" className="list-group-item" onClick={this.createVote.bind(this, "up")}>
        <span className="badge">{this.props.response && this.props.response.votes_count}</span>
        {this.props.response.body}
      </a>
    );
  }

});

module.exports = Response;
