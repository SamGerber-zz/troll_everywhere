var Dispatcher = require('../dispatcher');
var PollFormConstants = require('../constants/pollFormConstants.js');
var PollActions = require('../actions/pollActions.js');
var ApiUtil = require('../util/apiUtil.js');
var PollFormStore = require('../stores/pollFormStore.js');

var ApiActions = {
  addQuestion: function () {
    Dispatcher.dispatch({
      actionType: PollFormConstants.ADD_QUESTION,
    });
  },

  removeQuestion: function (questionIndex) {
    Dispatcher.dispatch({
      actionType: PollFormConstants.REMOVE_QUESTION,
      questionIndex: questionIndex
    });
  },

  updateQuestion: function (questionIndex, question) {
    Dispatcher.dispatch({
      actionType: PollFormConstants.UPDATE_QUESTION,
      questionIndex: questionIndex,
      question: question
    });
  },

  addResponse: function(questionIndex){
    Dispatcher.dispatch({
      actionType: PollFormConstants.ADD_RESPONSE,
      questionIndex: questionIndex
    });
  },

  removeResponse: function(questionIndex, responseIndex){
    Dispatcher.dispatch({
      actionType: PollFormConstants.REMOVE_RESPONSE,
      questionIndex: questionIndex,
      responseIndex: responseIndex
    });
  },

  updateResponse: function(questionIndex, responseIndex, response){
    Dispatcher.dispatch({
      actionType: PollFormConstants.UPDATE_RESPONSE,
      questionIndex: questionIndex,
      responseIndex: responseIndex,
      response: response
    });
  },

  updatePoll: function(poll){
    Dispatcher.dispatch({
      actionType: PollFormConstants.UPDATE_POLL,
      poll: poll
    });
  },

  submitPollForm: function(callback){
    var poll = PollFormStore.getPollWithNestedAttributes();
    var callbacks = [PollActions.receiveSinglePoll, callback];
    ApiUtil.createPoll(poll, callbacks);
  }

};

module.exports = ApiActions;
