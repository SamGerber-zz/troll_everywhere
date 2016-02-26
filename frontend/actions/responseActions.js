var Dispatcher = require('../dispatcher');
var ResponseConstants = require('../constants/responseConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var ResponseActions = {
  receiveAllResponses: function (responses) {
    Dispatcher.dispatch({
      actionType: ResponseConstants.RESPONSES_RECEIVED,
      responses: responses
    });
  },

  receiveSingleResponse: function (response) {
    Dispatcher.dispatch({
      actionType: ResponseConstants.RESPONSE_RECEIVED,
      response: response
    });
  },

  createResponse: function(pollId, response, callback){
    var callbacks = [this.receiveSingleResponse, callback];
    ApiUtil.createResponse(pollId, response, callbacks);
  }
};

module.exports = ResponseActions;
