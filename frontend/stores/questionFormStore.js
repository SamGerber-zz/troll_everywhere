var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var QuestionFormConstants = require('../constants/questionFormConstants.js');

var QuestionFormStore = new Store(AppDispatcher);

var blankResponse = function(ord) {
  return ({
    body: "",
    image_url: "",
    ord: ord,
    _delete: false
  });
};



var blankQuestion = {
  title: "",
  body: "",
  responses: [
    blankResponse(0),
    blankResponse(1)
  ]
};

var _questionForm = blankQuestion;

var resetQuestionForm = function () {
  _questionForm = blankQuestion;
};

QuestionFormStore.getQuestion = function () {
  return _questionForm;
};

// QuestionFormStore.getQuestionWithNestedAttributes = function () {
//   var _questionWithNestedAttributes = _questionForm;
//   _questionWithNestedAttributes.responses_attributes = _questionWithNestedAttributes.responses;
//   _questionWithNestedAttributes.responses_attributes.forEach(function(response){
//     response.responses_attributes = question.responses;
//   });
//   return _questionWithNestedAttributes;
// };

QuestionFormStore.getResponse = function(questionIndex, responseIndex) {
  return _questionForm.questions[questionIndex].responses[responseIndex];
};
//
// QuestionFormStore.getPoll = function () {
//   var poll = _questionForm.slice();
//   if (poll.title === "") {
//     return {};
//   }
//
//   poll.questions = [];
//   _questionForm.questions.forEach(function(question, i){
//     if (question.title !== "" ) {
//       poll.questions.push(question);
//       question.responses = [];
//       _questionForm.questions[i].responses.forEach(function(response){
//         if (response.body !== "" || response.iamge_url !== "") {
//           question.responses.push(response);
//         }
//       });
//     }
//   });
//
//   return poll;
// };


QuestionFormStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionFormConstants.ADD_RESPONSE:
      _questionForm.questions[payload.questionIndex].push(blankResponse);
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.REMOVE_RESPONSE:
      _questionForm.responses[payload.questionIndex].responses[payload.responseIndex]
        ._delete = true;
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.UPDATE_RESPONSE:
      _questionForm.responses[payload.questionIndex].responses[payload.responseIndex] =
        payload.response;
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.UPDATE_QUESTION:
      _questionForm = payload.question;
      QuestionFormStore.__emitChange();
      break;
  }
};

module.exports = QuestionFormStore;
