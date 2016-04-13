var Dispatcher = require('../dispatcher');
var QuestionConstants = require('../constants/questionConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var PollActions = require('./pollActions.js');

var QuestionActions = {

  // Callbacks
  receiveSingleQuestion: function (question) {
    Dispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_RECEIVED,
      question: question
    });
  },

  receiveAllQuestions: function (questions) {
    Dispatcher.dispatch({
      actionType: QuestionConstants.QUESTIONS_RECEIVED,
      questions: questions
    });
  },

  removeSingleQuestion: function (question) {
    Dispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_DELETED,
      question: question
    });
  },

  // Create
  createQuestion: function(pollId, question, callback){
    var callbacks = [PollActions.fetchSinglePollForQuestion, callback];
    ApiUtil.createQuestion(pollId, question, callbacks);
  },

  // Read
  fetchQuestionWithId: function(questionId, callback) {
    var callbacks = [QuestionActions.receiveSingleQuestion, callback];
    ApiUtil.fetchQuestionWithId(questionId, callbacks);
  },

  fetchAllQuestionsForPollWithId: function(pollId, callback) {
    var callbacks = [QuestionActions.receiveAllQuestions, callback];
    ApiUtil.fetchAllQuestionsForPollWithId(pollId, callbacks);
  },

  // Update
  updateQuestion: function(question, callback){
    var callbacks = [this.receiveSingleQuestion, callback];
    ApiUtil.updateQuestion(question, callbacks);
  },

  // Destroy
  deleteQuestion: function(question, callback){
    var callbacks = [PollActions.fetchSinglePollForQuestion, callback];
    ApiUtil.deleteQuestion(question, callbacks);
  },

  // Miscellaneous
  clearResponses: function(question, callback){
    var callbacks = [QuestionActions.receiveSingleQuestion, callback];
      question.responses.forEach(function(response){
      response["_destroy"] = true;
    });
    question['responses_attributes'] = question['responses'];
    ApiUtil.updateQuestion(question, callbacks);
  },

  updateActiveQuestion: function(question, callback) {
    var callbacks = [PollActions.fetchAllPolls, callback];
    var userParams = { active_question_id: question.is_active ? null : question.id};
    ApiUtil.updateCurrentUser(userParams, callbacks);
  },

  lockQuestions: function(questionIds, callback) {
    var callbacks = [PollActions.fetchAllPolls, callback];
    var questionParams = { is_locked: true };
    ApiUtil.updateQuestions(questionIds, questionParams, callbacks);
  },

  unlockQuestions: function(questionIds, callback) {
    var callbacks = [PollActions.fetchAllPolls, callback];
    var questionParams = { is_locked: false };
    ApiUtil.updateQuestions(questionIds, questionParams, callbacks);
  }

};

module.exports = QuestionActions;
