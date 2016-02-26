var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');
var QuestionFiltersConstants = require('../constants/questionFilterConstants');

var _questionFilters = {};

var QuestionFiltersStore = new Store(AppDispatcher);

var updateQuestionFilters = function (questionFilters) {
  Object.keys(questionFilters).forEach(function(key){
    _questionFilters[key] = questionFilters[key];
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
  }
};

QuestionFiltersStore.all = function () {
  return _questionFilters;
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
