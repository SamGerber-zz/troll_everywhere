var Dispatcher = require('../dispatcher');
var QuestionConstants = require('../constants/questionConstants.js');
var ApiUtil = require('../util/apiUtil.js');
var PollActions = require('./pollActions.js');
var SessionStore = require('../stores/sessionStore.js');

var QuestionActions = {
  receiveAllQuestions: function (questions) {
    Dispatcher.dispatch({
      actionType: QuestionConstants.QUESTIONS_RECEIVED,
      questions: questions
    });
  },

  receiveSingleQuestion: function (question) {
    Dispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_RECEIVED,
      question: question
    });
  },

  createQuestion: function(pollId, question, callback){
    var callbacks = [QuestionActions.receiveSingleQuestion, callback];
    ApiUtil.createQuestion(pollId, question, callbacks);
  },

  fetchAllQuestionsForPollWithId: function(pollId, callback) {
    var callbacks = [QuestionActions.receiveAllQuestions, callback];
    ApiUtil.fetchAllQuestionsForPollWithId(pollId, callbacks);
  },

  fetchQuestionWithId: function(questionId, callback) {
    var callbacks = [QuestionActions.receiveSingleQuestion, callback];
    ApiUtil.fetchQuestionWithId(questionId, callbacks);
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
