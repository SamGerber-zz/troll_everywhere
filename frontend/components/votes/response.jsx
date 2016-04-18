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
      <a href="#" className={"list-group-item voting-btn btn-lg"+locked}
                  onClick={this.createVote.bind(this, "up")}
                  style={{textAlign: 'left'}}>
        <h3>{this.props.response.body}<span className="label label-info pull-right">{this.props.response && this.props.response.votes.length}</span>
        </h3>
      </a>
    );
  }

});

module.exports = Response;
