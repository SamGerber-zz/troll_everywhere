var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var VoteConstants = require('../constants/voteConstants.js');
var VoteStore = new Store(AppDispatcher);

var _votes = {};

var resetVotes = function (votes) {
  _votes = {};
  votes.forEach(function (vote) {
    _votes[vote.id] = vote;
  });
};

var resetVote = function (vote) {
  _votes[vote.id] = vote;
};

VoteStore.all = function () {
  var votes = Object.keys(_votes).map(function(id){
    return _votes[id];
  });

  return votes;
};

VoteStore.find = function (id) {
  return _votes[id];
};

VoteStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case VoteConstants.VOTES_RECEIVED:
      resetVotes(payload.votes);
      VoteStore.__emitChange();
      break;
    case VoteConstants.VOTE_RECEIVED:
      resetVote(payload.vote);
      VoteStore.__emitChange();
      break;
  }
};

module.exports = VoteStore;
