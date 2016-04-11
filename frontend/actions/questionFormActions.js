var Dispatcher = require('../dispatcher');
var QuestionFormConstants = require('../constants/questionFormConstants.js');
var ApiUtil = require('../util/apiUtil.js');
var PollActions = require('./pollActions.js');
var SessionStore = require('../stores/sessionStore.js');

var QuestionFormActions = {

  receiveQuestionForm: function (questionForm) {
    Dispatcher.dispatch({
      actionType: QuestionFormConstants.UPDATE_QUESTION,
      question: questionForm
    });
  },

  createQuestion: function(pollId, question, callback){
    question['responses_attributes'] = question['responses'];
    delete question['responses'];
    var callbacks = [QuestionFormActions.receiveSingleQuestion, callback];
    ApiUtil.createQuestion(pollId, question, callbacks);
    question['responses'] = question['responses_attributes'];
    delete question['responses_attributes'];
  },

  updateQuestion: function(questionId, question, callback){
    question['responses_attributes'] = question['responses'];
    delete question['responses'];
    question['responses_attributes'].forEach(function(ra){delete ra['votes'];});

    var callbacks = [QuestionFormActions.receiveSingleQuestion, callback];
    ApiUtil.updateQuestion(question, callbacks);
    question['responses'] = question['responses_attributes'];
    delete question['responses_attributes'];
  },

  clearResponses: function(question, callback){
    var callbacks = [QuestionFormActions.receiveSingleQuestion, callback];
      question.responses.forEach(function(response){
      response["_destroy"] = true;
    });
    question['responses_attributes'] = question['responses'];
    ApiUtil.updateQuestion(question, callbacks);
  },

  fetchBlankQuestionFormForPollWithId: function(pollId, callback) {
    var callbacks = [QuestionFormActions.receiveQuestionForm, callback];
    ApiUtil.fetchBlankQuestionFormForPollWithId(pollId, callbacks);
  },

  fetchQuestionFormForQuestionWithId: function(questionId, callback) {
    var callbacks = [QuestionFormActions.receiveQuestionForm, callback];
    ApiUtil.fetchQuestionFormForQuestionWithId(questionId, callbacks);
  },
};

module.exports = QuestionFormActions;
