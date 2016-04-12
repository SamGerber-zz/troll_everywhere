var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var PollFormConstants = require('../constants/pollFormConstants.js');
var SessionConstants = require('../constants/sessionConstants.js');
var PollFormStore = new Store(AppDispatcher);

var blankResponse = {
  questionIndex: 0,
  responseIndex: 0,
  body: "",
  image_url: "",
  _destroy: false
};

var blankQuestion = {
  questionIndex: 0,
  title: "",
  body: "",
  image_url: "",
  responses: [
    blankResponse,
    Object.assign(blankResponse, {responseIndex: 1})
  ],
  _destroy: false
};

var blankPoll = {
  title: "",
  questions: [
    blankQuestion
  ]
};

var _pollForm = blankPoll;

var resetPollForm = function () {
  _pollForm = blankPoll;
};

PollFormStore.getPoll = function () {
  return _pollForm;
};

PollFormStore.getPollWithNestedAttributes = function () {
  var _pollWithNestedAttributes = _pollForm;
  _pollWithNestedAttributes.questions_attributes = _pollWithNestedAttributes.questions;
  _pollWithNestedAttributes.questions_attributes.forEach(function(question){
    question.responses_attributes = question.responses;
  });
  return _pollWithNestedAttributes;
};

PollFormStore.getQuestion = function(questionIndex) {
  return _pollForm.questions[questionIndex];
};

PollFormStore.getResponse = function(questionIndex, responseIndex) {
  return _pollForm.questions[questionIndex].responses[responseIndex];
};
//
// PollFormStore.getPoll = function () {
//   var poll = _pollForm.slice();
//   if (poll.title === "") {
//     return {};
//   }
//
//   poll.questions = [];
//   _pollForm.questions.forEach(function(question, i){
//     if (question.title !== "" ) {
//       poll.questions.push(question);
//       question.responses = [];
//       _pollForm.questions[i].responses.forEach(function(response){
//         if (response.body !== "" || response.iamge_url !== "") {
//           question.responses.push(response);
//         }
//       });
//     }
//   });
//
//   return poll;
// };


PollFormStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGGED_OUT:
      resetPollForm();
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.ADD_QUESTION:
      _pollForm.questions.push(blankQuestion);
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.REMOVE_QUESTION:
      _pollForm.questions[payload.questionIndex]._destroy = true;
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.UPDATE_QUESTION:
      _pollForm.questions[payload.questionIndex] = payload.question;
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.ADD_RESPONSE:
      _pollForm.questions[payload.questionIndex].push(blankResponse);
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.REMOVE_RESPONSE:
      _pollForm.questions[payload.questionIndex].responses[payload.responseIndex]
        ._destroy = true;
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.UPDATE_RESPONSE:
      _pollForm.questions[payload.questionIndex].responses[payload.responseIndex] =
        payload.response;
      PollFormStore.__emitChange();
      break;
    case PollFormConstants.UPDATE_POLL:
      _pollForm = payload.poll;
      PollFormStore.__emitChange();
      break;
  }
};

module.exports = PollFormStore;
