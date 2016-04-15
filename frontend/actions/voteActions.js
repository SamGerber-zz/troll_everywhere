var Dispatcher = require('../dispatcher');
var VoteConstants = require('../constants/voteConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var VoteActions = {

  // Callbacks
  receiveAllVotes: function (votes) {
    Dispatcher.dispatch({
      actionType: VoteConstants.VOTES_RECEIVED,
      votes: votes
    });
  },

  receiveSingleVote: function (vote) {
    Dispatcher.dispatch({
      actionType: VoteConstants.VOTE_RECEIVED,
      vote: vote
    });
  },

  // Create
  createVote: function(responseId, vote, callback){
    var callbacks = [this.receiveSingleVote, callback];
    ApiUtil.createVote(responseId, vote, callbacks);
  }
};

module.exports = VoteActions;
