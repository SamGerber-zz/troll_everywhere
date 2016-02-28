var Dispatcher = require('../dispatcher');
var SessionConstants = require('../constants/sessionConstants.js');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/sessionStore.js');

var ApiActions = {

  // Inbound from API, out to dispatcher

  clearCurrentUser: function () {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGGED_OUT,
    });
  },

  receiveCurrentUser: function (message) {
    if (message.errors) {
      Dispatcher.dispatch({
        actionType: SessionConstants.LOGGED_OUT,
        errors: message.errors
      });
    } else {
      Dispatcher.dispatch({
        actionType: SessionConstants.LOGGED_IN,
        currentUser: message
      });
    }
  },



  // Outbound to API

  registerUser: function(user, callback){
    var currentUser = SessionStore.currentUser();
    if (currentUser) {
      if(callback) {
        callback(currentUser);
      }
      return;
    }
    var callbacks = [this.receiveCurrentUser, callback];
    ApiUtil.createUser(user, callbacks);
  },

  getCurrentUser: function(callback){
    var callbacks = [this.receiveCurrentUser, callback];
    ApiUtil.getCurrentUser(callbacks);
  },

  loginUser: function(user, callback){
    var currentUser = SessionStore.currentUser();
    if (currentUser) {
      if(callback) {
        callback(currentUser);
      }
      return;
    }
    var callbacks = [this.receiveCurrentUser, callback];
    user && ApiUtil.loginUser(user, callbacks);
  },

  logout: function(callback){
    var callbacks = [this.clearCurrentUser, callback];
    ApiUtil.logout(callbacks);
  }
};

window.sessionActions = ApiActions;

module.exports = ApiActions;
