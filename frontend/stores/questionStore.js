var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var QuestionConstants = require('../constants/questionConstants.js');
var QuestionStore = new Store(AppDispatcher);

var _questions = {};
var _selectedQuestionIds = [];

var resetQuestions = function (questions) {
  _questions = {};
  questions.forEach(function (question) {
    _questions[question.id] = question;
  });
};

var resetQuestion = function (question) {
  _questions[question.id] = question;
};

QuestionStore.selectedQuestionIds = function () {
  return _selectedQuestionIds;
};

QuestionStore.all = function () {
  var questions = Object.keys(_questions).map(function(id){
    return _questions[id];
  });

  return questions;
};

QuestionStore.forPollWithId = function (pollId) {
  var questions = Object.keys(_questions).map(function(id){
    if (_questions[id].poll_id === pollId) {
      return _questions[id];
    }
  });

  return questions;
};

QuestionStore.find = function (id) {
  return _questions[id];
};

QuestionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionConstants.QUESTIONS_RECEIVED:
      resetQuestions(payload.questions);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_RECEIVED:
      resetQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
