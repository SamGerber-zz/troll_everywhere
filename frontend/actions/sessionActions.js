var Dispatcher = require('../dispatcher');
var SessionConstants = require('../constants/sessionConstants.js');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/sessionStore.js');

var SessionActions = {

  // Callbacks
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



  // Create
  registerUser: function(user, callback){
    var currentUser = SessionStore.currentUser();
    if (currentUser && !currentUser.is_guest) {
      if(callback) {
        callback(currentUser);
      }
      return;
    }
    var callbacks = [this.receiveCurrentUser, callback];
    ApiUtil.createUser(user, callbacks);
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

  // Read
  getCurrentUser: function(callback){
    var callbacks = [this.receiveCurrentUser, callback];
    ApiUtil.getCurrentUser(callbacks);
  },

  // Update

  //Destroy
  logout: function(callback){
    var callbacks = [this.clearCurrentUser, callback];
    ApiUtil.logout(callbacks);
  }
};

module.exports = SessionActions;
