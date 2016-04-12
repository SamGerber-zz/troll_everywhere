var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var QuestionConstants = require('../constants/questionConstants.js');
var PollConstants = require('../constants/pollConstants.js');
var SessionConstants = require('../constants/sessionConstants.js');

var QuestionStore = new Store(AppDispatcher);

var _questions = {};
var _presentedQuestion = {};
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

var resetPresentedQuestion = function (question) {
  _presentedQuestion = question;
};

var removeQuestion = function (question) {
  delete _questions[question.id];
  if (_presentedQuestion.id === question.id) {
    _presentedQuestion = {};
  }
  _selectedQuestionIds = _selectedQuestionIds.filter(function(id){
    return id != question.id;
  });
};

QuestionStore.selectedQuestionIds = function () {
  return _selectedQuestionIds;
};

QuestionStore.presentedQuestion = function () {
  return _presentedQuestion;
};

QuestionStore.all = function () {
  var questions = Object.keys(_questions).map(function(id){
    return _questions[id];
  });

  return questions;
};

QuestionStore.allIds = function () {
  var questions = Object.keys(_questions).map(function(id){
    return _questions[id].id;
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
    case SessionConstants.LOGGED_OUT:
      resetQuestions([]);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTIONS_RECEIVED:
      resetQuestions(payload.questions);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_RECEIVED:
      resetQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_DELETED:
      removeQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.PRESENTATION_RECEIVED:
      resetPresentedQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
    case PollConstants.POLLS_RECEIVED:
      var questions = [];
      payload.polls.forEach(function(poll){
        questions = questions.concat(poll.questions);
      });
      resetQuestions(questions);
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
