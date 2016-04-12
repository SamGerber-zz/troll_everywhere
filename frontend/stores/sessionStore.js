var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');


var SessionStore = new Store(AppDispatcher);

var _currentUser = null;


var clearCurrentUser = function () {
  _currentUser = null;
};


SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isUserLoggedIn = function () {
  return Boolean(_currentUser);
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGGED_IN:
      _currentUser = payload.currentUser;
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGGED_OUT:
      clearCurrentUser();
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
