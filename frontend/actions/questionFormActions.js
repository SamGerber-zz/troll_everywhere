var Dispatcher = require('../dispatcher');
var QuestionFormConstants = require('../constants/questionFormConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var PollActions = require('./pollActions.js');

var QuestionFormActions = {

  // Callbacks
  receiveQuestionForm: function (questionForm) {
    Dispatcher.dispatch({
      actionType: QuestionFormConstants.UPDATE_QUESTION,
      question: questionForm
    });
  },

  // Create
  createQuestion: function(pollId, question, callback){
    question['responses_attributes'] = question['responses'];
    delete question['responses'];
    var callbacks = [QuestionFormActions.receiveSingleQuestion, PollActions.fetchSinglePollForQuestion, callback];
    ApiUtil.createQuestion(pollId, question, callbacks);
    question['responses'] = question['responses_attributes'];
    delete question['responses_attributes'];
  },

  // Read
  fetchBlankQuestionFormForPollWithId: function(pollId, callback) {
    var callbacks = [QuestionFormActions.receiveQuestionForm, callback];
    ApiUtil.fetchBlankQuestionFormForPollWithId(pollId, callbacks);
  },

  fetchQuestionFormForQuestionWithId: function(questionId, callback) {
    var callbacks = [QuestionFormActions.receiveQuestionForm, callback];
    ApiUtil.fetchQuestionFormForQuestionWithId(questionId, callbacks);
  },

  // Update
  updateQuestion: function(questionId, question, callback){
    question['responses_attributes'] = question['responses'];
    delete question['responses'];
    question['responses_attributes'].forEach(function(ra){delete ra['votes'];});

    var callbacks = [PollActions.fetchSinglePollForQuestion, callback];
    ApiUtil.updateQuestion(question, callbacks);
    question['responses'] = question['responses_attributes'];
    delete question['responses_attributes'];
  }
};

module.exports = QuestionFormActions;
