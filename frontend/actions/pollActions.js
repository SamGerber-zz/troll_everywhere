var Dispatcher = require('../dispatcher');
var PollConstants = require('../constants/pollConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var ApiActions = {
  receiveAllPolls: function (polls) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLLS_RECEIVED,
      polls: polls
    });
  },

  receiveSinglePoll: function (poll) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_RECEIVED,
      poll: poll
    });
  },

  createPoll: function(poll, callback){
    var callbacks = [this.receiveSinglePoll, callback];
    ApiUtil.createPoll(poll, callbacks);
  },

  fetchAllPolls: function(userId, callback){
    var callbacks = [this.receiveAllPolls, callback];
    ApiUtil.fetchAllPolls(userId, callbacks);
  },

  fetchSinglePoll: function(PollId, callback){
    var callbacks = [this.receiveSinglePoll, callback];
    ApiUtil.fetchSinglePoll(PollId, callbacks);
  }
};

module.exports = ApiActions;
