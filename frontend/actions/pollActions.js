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

  updatePoll: function(poll, callback){
    var callbacks = [this.receiveSinglePoll, callback];
    ApiUtil.updatePoll(poll, callbacks);
  },

  deletePoll: function(poll, callback){
    var callbacks = [callback];
    ApiUtil.deletePoll(poll, callbacks);
  },

  fetchAllPolls: function(userId, callback){

    var callbacks = [ApiActions.receiveAllPolls, callback];
    ApiUtil.fetchAllPolls(userId, callbacks);
  },

  fetchSinglePoll: function(PollId, callback){
    var callbacks = [ApiActions.receiveSinglePoll, callback];
    ApiUtil.fetchSinglePoll(PollId, callbacks);
  },
  fetchSinglePollForQuestion: function(Question, callback){
    var callbacks = [ApiActions.receiveSinglePoll, callback];
    ApiUtil.fetchSinglePoll(Question.poll_id, callbacks);
  }
};

module.exports = ApiActions;
