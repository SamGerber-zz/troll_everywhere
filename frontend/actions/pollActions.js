var Dispatcher = require('../dispatcher');
var PollConstants = require('../constants/pollConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var PollActions = {
  // Create
  createPoll: function(poll, callback){
    var callbacks = [this.receiveSinglePoll, callback];
    ApiUtil.createPoll(poll, callbacks);
  },

  // Read
  fetchSinglePoll: function(PollId, callback){
    var callbacks = [PollActions.receiveSinglePoll, callback];
    ApiUtil.fetchSinglePoll(PollId, callbacks);
  },

  fetchSinglePollForQuestion: function(Question, callback){
    var callbacks = [PollActions.receiveSinglePoll, callback];
    ApiUtil.fetchSinglePoll(Question.poll_id, callbacks);
  },

  receiveSinglePoll: function (poll) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_RECEIVED,
      poll: poll
    });
  },

  fetchAllPolls: function(userId, callback){
    var callbacks = [PollActions.receiveAllPolls, callback];
    ApiUtil.fetchAllPolls(userId, callbacks);
  },

  receiveAllPolls: function (polls) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLLS_RECEIVED,
      polls: polls
    });
  },

  // Update
  updatePoll: function(poll, callback){
    var callbacks = [this.receiveSinglePoll, callback];
    ApiUtil.updatePoll(poll, callbacks);
  },

  // Destroy
  deletePoll: function(poll, callback){
    var callbacks = [callback];
    ApiUtil.deletePoll(poll, callbacks);
  }
};

module.exports = PollActions;
