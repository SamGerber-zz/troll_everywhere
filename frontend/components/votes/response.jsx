var React = require('react');
var VoteActions = require('../../actions/voteActions');
var QuestionStore = require('../../stores/questionStore');

var Response = React.createClass({

  createVote: function (direction, e) {
    e.preventDefault();

    var vote = {is_up_vote: true};
    var responseId = this.props.response.id;
    VoteActions.createVote(responseId, vote);
  },

  render: function() {
    var locked = this.props.locked ? " disabled" : "";
    return (
      <a href="#" className={"list-group-item btn"+locked}
                  onClick={this.createVote.bind(this, "up")}
                  style={{textAlign: 'left'}}>
        <span className="badge">{this.props.response && this.props.response.votes.length}</span>
        {this.props.response.body}
      </a>
    );
  }

});

module.exports = Response;
