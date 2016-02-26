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
  }
};

module.exports = QuestionFilterActions;
