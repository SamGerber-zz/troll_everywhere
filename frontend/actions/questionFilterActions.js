var Dispatcher = require('../dispatcher');
var QuestionFilterConstants = require('../constants/questionFilterConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var QuestionFilterActions = {
  receiveAllQuestionFilters: function (questionFilters) {
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.QUESTION_FILTERS_RECEIVED,
      questionFilters: questionFilters
    });
  },

  receiveSingleQuestionFilter: function (questionFilter) {
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.QUESTION_FILTER_RECEIVED,
      questionFilter: questionFilter
    });
  },

  createQuestionFilter: function(pollId, questionFilter, callback){
    var callbacks = [this.receiveSingleQuestionFilter, callback];
    ApiUtil.createQuestionFilter(pollId, questionFilter, callbacks);
  },

  updateQuestionFilter: function(questionFilter){
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.UPDATE_QUESTION_FILTER,
      questionFilter: questionFilter
    });
  },

  toggleSingleCheck: function(question){
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.TOGGLE_SINGLE_CHECK,
      questionId: question.id
    });
  },

  toggleChecks: function(questions){
    var questionIds = questions.map(function (question) {
      return question.id;
    });

    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.TOGGLE_CHECKS,
      questionIds: questionIds
    });
  },

  checkAll: function(questions){
    var questionIds = questions.map(function (question) {
      return question.id;
    });

    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.CHECK_ALL,
      questionIds: questionIds
    });
  },

};

module.exports = QuestionFilterActions;
