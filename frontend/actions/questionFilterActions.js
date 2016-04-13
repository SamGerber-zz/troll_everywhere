var Dispatcher = require('../dispatcher');
var QuestionFilterConstants = require('../constants/questionFilterConstants.js');

var QuestionFilterActions = {

  receiveAllQuestionFilters: function (questionFilters) {
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.QUESTION_FILTERS_RECEIVED,
      questionFilters: questionFilters
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

  checkEverything: function(){
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.CHECK_EVERYTHING,
    });
  },
  
  checkNothing: function(){
    Dispatcher.dispatch({
      actionType: QuestionFilterConstants.CHECK_NOTHING,
    });
  },

};

module.exports = QuestionFilterActions;
