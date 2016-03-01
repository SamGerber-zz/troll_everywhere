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
      <li href="#" className="list-group-item " >
        <div className="row">
          <div className="col-xs-6"><h2>{this.props.response.body}</h2></div>
          <div className="col-xs-6 progress votes-bar">
            <div className="progress-bar progress-bar-info"
                 role="progressbar" aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100"
                 style={{width: this.props.percentage + "%"}} >
               {this.props.response.votes_count}
            </div>
          </div>
        </div>
      </li>
    );
  }

});

module.exports = Response;
