var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var ResponseConstants = require('../constants/ResponseConstants.js');
var ResponseStore = new Store(AppDispatcher);

var _Responses = {};

var resetResponses = function (Responses) {
  _Responses = {};
  Responses.forEach(function (Response) {
    _Responses[Response.id] = Response;
  });
};

var resetResponse = function (Response) {
  _Responses[Response.id] = Response;
};

ResponseStore.all = function () {
  var Responses = Object.keys(_Responses).map(function(id){
    return _Responses[id];
  });

  return Responses;
};

ResponseStore.find = function (id) {
  return _Responses[id];
};

ResponseStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ResponseConstants.RESPONSES_RECEIVED:
      resetResponses(payload.Responses);
      ResponseStore.__emitChange();
      break;
    case ResponseConstants.RESPONSE_RECEIVED:
      resetResponse(payload.Response);
      ResponseStore.__emitChange();
      break;
  }
};

module.exports = ResponseStore;
