var Dispatcher = require('../dispatcher');
var QuestionConstants = require('../constants/questionConstants.js');
var ApiUtil = require('../util/apiUtil.js');

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
    var callbacks = [this.receiveSingleQuestion, callback];
    ApiUtil.createQuestion(pollId, question, callbacks);
  },

  fetchAllQuestionsForPollWithId: function(pollId, callback) {
    var callbacks = [this.receiveAllQuestions, callback];
    ApiUtil.fetchAllQuestionsForPollWithId(pollId, callbacks);
  }


};

module.exports = QuestionActions;
