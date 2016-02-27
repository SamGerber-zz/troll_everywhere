var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');
var QuestionFiltersConstants = require('../constants/questionFilterConstants');
var QuestionStore = require('./questionStore');

var _questionFilters = {};

var _checkedQuestionIds = {};

var QuestionFiltersStore = new Store(AppDispatcher);

var updateQuestionFilters = function (questionFilters) {
  Object.keys(questionFilters).forEach(function(key){
    _questionFilters[key] = questionFilters[key];
  });
};

var toggleChecks = function (questionIds) {
  questionIds.forEach(function(questionId){
    if (_checkedQuestionIds[questionId]) {
      delete _checkedQuestionIds[questionId];
    } else {
      _checkedQuestionIds[questionId] = true;
    }
  });
};

var checkAll = function (questionIds) {
  questionIds.forEach(function(questionId){
    _checkedQuestionIds[questionId] = true;
  });
};


QuestionFiltersStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case QuestionFiltersConstants.QUESTION_FILTERS_RECEIVED:
    updateQuestionFilters(payload.questionFilters);
    QuestionFiltersStore.__emitChange();
    break;
  case QuestionFiltersConstants.QUESTION_FILTER_RECEIVED:
    var questionFilter = payload.questionFilter;
    _questionFilters[questionFilter.id] = questionFilter;
    QuestionFiltersStore.__emitChange();
    break;
  case QuestionFiltersConstants.UPDATE_QUESTION_FILTER:
    updateQuestionFilters(payload.questionFilters);
    QuestionFiltersStore.__emitChange();
    break;
  case QuestionFiltersConstants.TOGGLE_SINGLE_CHECK:
    toggleChecks([payload.questionId]);
    QuestionFiltersStore.__emitChange();
    break;
  case QuestionFiltersConstants.TOGGLE_CHECKS:
    toggleChecks(payload.questionIds);
    QuestionFiltersStore.__emitChange();
    break;
  case QuestionFiltersConstants.CHECK_ALL:
    checkAll(payload.questionIds);
    QuestionFiltersStore.__emitChange();
    break;
  }
};

QuestionFiltersStore.all = function () {
  return _questionFilters;
};

QuestionFiltersStore.checkedQuestionIds = function () {
  return Object.keys(_checkedQuestionIds);
};

QuestionFiltersStore.isCheckedQuestion = function (question) {
  return Boolean(_checkedQuestionIds[question.id]);
};

QuestionFiltersStore.areCheckedQuestions = function (questions) {
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (!_checkedQuestionIds[question.id]) {
      console.log(false);
      return false;
    }
  }
  return true;
};

QuestionFiltersStore.filter = function (questions) {
  var filteredQuestions = questions.filter(function(question) {
    var title = question.title.toUpperCase();
    var searchText = _questionFilters.searchText ? _questionFilters.searchText : '';
    return title.match(searchText.toUpperCase());
  });
  return filteredQuestions;
};

QuestionFiltersStore.find = function (filterName) {
  return _questionFilters[filterName];
};

window.QuestionFiltersStore = QuestionFiltersStore;

module.exports = QuestionFiltersStore;
